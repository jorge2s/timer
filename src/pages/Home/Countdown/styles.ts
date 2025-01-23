import styled from "styled-components";

export const CountdownContainer = styled.div`
 font-family: 'Roboto Mono', monospace;
 font-size: 10rem;
 line-height: 8rem;
 color: ${props => props.theme.COLORS.GRAY_700};

 display: flex;
 gap: 1rem;

 span {
  background: ${props => props.theme.COLORS.GRAY_150};
  padding: 2rem 1rem;
  border-radius: 8px;
 }
`;

export const Separator = styled.div`
  padding-right: .7rem;
  color: ${props => props.theme.COLORS.GREEN};

  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;