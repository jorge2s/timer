import { NavLink } from "react-router-dom";
import { Scroll, Timer } from "phosphor-react";

import { HeaderContainer } from "./styles";

import logo from '../../assets/react.svg';

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" title="Temporizador">
          <Timer size={24}/>
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24}/>
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}