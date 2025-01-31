import { useContext } from "react";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { CyclesContext } from "../../contexts/CyclesContext";

import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!!cycles.length && cycles.map(({id, task, minutesAmount, startDate, finishedDate, interruptDate }) => (
              <tr key={id}>
                <td>{task}</td>
                <td>{minutesAmount} minutos</td>
                <td>{formatDistanceToNow(startDate, {
                  addSuffix: true,
                  locale: ptBR,
                })}</td>
                <td>
                  {finishedDate && (
                    <Status status-color="green">Concluído</Status>
                  )}

                  {interruptDate && (
                    <Status status-color="red">Interrompido</Status>
                  )}

                  {!finishedDate && !interruptDate && (
                    <Status status-color="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}