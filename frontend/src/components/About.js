import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
const Header = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 35px;
  margin-top: 20px;
  text-align: center;
`;
//create a basic about page

function About() {
  return (
    <div>
      <Header>How it works</Header>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
      <Header>Sources</Header>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
      <Header>Links</Header>
      <Header
        style={{
          fontSize: "18px",
          fontWeight: "normal",
          marginBottom: "20px",
          marginTop: "0px",
        }}
      >
        <a href="https://www.google.com">Github</a>
      </Header>
      <Header></Header>
    </div>
  );
}
export default About;
