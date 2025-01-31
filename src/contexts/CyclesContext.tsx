import { createContext, useReducer, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptDate?: Date;
  finishedDate?: Date;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
  handlerMarkCurrentCycleAsFinished: () => void;
  handlerSetAmountSecondsPassed: (seconds: number) => void;
};

export const CyclesContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
  children: React.ReactNode;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  // const [cycles, setCycles] = useState<Cycle[]>([]);
  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
    switch(action.type) {
      case 'ADD_NEW_CYCLE':
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        };
      case 'INTERRUPT_CURRENT_CYCLE':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptDate: new Date() };
            } else {
              return cycle;
            }
          }),
          activeCycleId: null,
        };
      case 'MARK_CURRENT_CYCLE_AS_FINISHED':
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() };
            } else {
              return cycle;
            }
          }),
          activeCycleId: null,
        };
      default:
        return state;
    }
  }, {
    cycles: [],
    activeCycleId: null,
  });


  const { cycles, activeCycleId } = cyclesState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  function handlerMarkCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      }
    });
    /* setCycles((prevState) =>
      prevState.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
           ...cycle,
            finishedDate: new Date(),
          };
        } else {
          return cycle;
        }
      })
    ); */
  }

  function handlerSetAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle (data: CreateCycleData) {
    const id = new Date().getTime().toString();
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    // setCycles(prevState => [...prevState, newCycle]);
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      }
    });
    setAmountSecondsPassed(0);
  };

  function interruptCurrentCycle () {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      }
    });
    /* setCycles(prevState =>
      prevState.map(cycle => {
        if (cycle.id === activeCycleId) {
          return {
           ...cycle,
            interruptDate: new Date(),
          };
        } else {
          return cycle;
        }
      })
    ); */
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        handlerMarkCurrentCycleAsFinished,
        handlerSetAmountSecondsPassed,
      }}
    >
      { children }
    </CyclesContext.Provider>
  );
}