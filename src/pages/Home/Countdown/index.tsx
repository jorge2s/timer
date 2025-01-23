import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../contexts/CyclesContext";

export function Countdown() {
  const { 
    activeCycle,
    amountSecondsPassed,
    handlerMarkCurrentCycleAsFinished,
    handlerSetAmountSecondsPassed
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    let interval: number = 0;
    if (activeCycle) {
      interval = setInterval(() => {
        const affterSeconds = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (affterSeconds >= totalSeconds) {
          handlerMarkCurrentCycleAsFinished();
          handlerSetAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          handlerSetAmountSecondsPassed(affterSeconds);
        }

      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };

  }, [
    activeCycle,
    totalSeconds,
    handlerSetAmountSecondsPassed,
    handlerMarkCurrentCycleAsFinished
  ]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}