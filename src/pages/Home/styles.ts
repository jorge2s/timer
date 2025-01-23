import styled from 'styled-components';

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  color: ${props => props.theme.COLORS.GRAY_700};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${props => props.theme.COLORS.GREEN};

  &:not(:disabled):hover {
    background: ${props => props.theme.COLORS.GREEN_DARK};
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${props => props.theme.COLORS.RED};

  &:not(:disabled):hover {
    background: ${props => props.theme.COLORS.RED_DARK};
  }
`;