import { createContext, useState } from "react";

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

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  function handlerMarkCurrentCycleAsFinished() {
    setCycles((prevState) =>
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
    );
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
    setCycles(prevState => [...prevState, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
  };

  function interruptCurrentCycle () {
    setActiveCycleId(null);

    setCycles(prevState =>
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
    );
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