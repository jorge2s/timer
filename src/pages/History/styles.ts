import styled from 'styled-components';

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${props => props.theme.COLORS.GRAY_700};
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse; // não soma a bordar de dois elementos
    min-width: 600px;

    th {
      background-color: ${props => props.theme.COLORS.GRAY_300};
      padding: 1rem;
      text-align: left;
      color: ${props => props.theme.COLORS.GRAY_700};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${props => props.theme.COLORS.GRAY_150};
      color: ${props => props.theme.COLORS.GRAY_600};
      border-top: 4px solid ${props => props.theme.COLORS.GRAY_200};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        padding-left: 1.5rem;
        width: 50%;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;

const STATUS_COLORS = { 
  yellow: 'YELLOW_500',
  green: 'GREEN_LIGHT',
  red: 'RED',
} as const

interface StatusProps {
  'status-color': keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${props => props.theme.COLORS[STATUS_COLORS[props['status-color']]]};
  }
`;