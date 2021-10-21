import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Menu = () => {
  return (
    <MenuWrapper>
      <Logo>LOGO HERE</Logo>
      <Links>
        <NavLink to="/">Map</NavLink>
        <NavLink to="/admin/1">Admin</NavLink>
      </Links>
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  font-family: Nunito;
  height: 90px;
  background: #fff;
  z-index: 1;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const Logo = styled.h2`
  font-size: 40px;
`;

const Links = styled.div`
  a {
    font-size: 20px;
    color: #000;
    text-decoration: none;
    padding-bottom: 1px;
    margin-left: 40px;

    :hover {
      cursor: pointer;
      border-bottom: 1px solid #000;
    }
  }
`;
