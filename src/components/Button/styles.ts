import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning';

interface ButtonContainerProps {
  variant: ButtonVariant;
};

const buttonVariants = {
  primary: 'purple',
  secondary: 'gray',
  danger: 'red',
  warning: 'orange',
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  margin: 8px;
  border: 0px solid;
  border-radius: 8px;

  background-color: ${props => props.theme.COLORS.GREEN};
  color: ${props => props.theme.COLORS.WHITE};
`