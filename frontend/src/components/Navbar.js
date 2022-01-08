import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const NavbarWrapper = styled.ul`
  border-radius: 25px;
  display: flex;
  text-align: center;
  align-items: center;
  padding: 0 10px;
  margin: 40px 0;
  justify-content: center;
`;
const NavLink = styled.li`
  list-style: none;
  font-size: 20px;
  // text-decoration: underline;
  color: white;
  font-weight: bold;
  padding: 12px 16px;
  margin: 0 12px;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    transition: 0.2s;
    border-radius: 25px;
  }
  &:hover::before {
    box-shadow: 0px 3px 20px 0px black;
    transform: scale(1.2);
    background: linear-gradient(to bottom, #e8edec, #d2d1d3);
  }
  &:hover {
    color: black;
  }
`;

function Navbar() {
  return (
    <NavbarWrapper>
      {" "}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <NavLink>Home</NavLink>
      </Link>
      <Link
        to="/stats"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <NavLink>Stats</NavLink>
      </Link>
      <Link
        to="/quiz"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <NavLink>Quiz</NavLink>{" "}
      </Link>
      <Link
        to="/about"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <NavLink>About</NavLink>{" "}
      </Link>
    </NavbarWrapper>
  );
}

export default Navbar;
