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
      <ol
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          marginBottom: "35px",
          marginTop: "20px",
          color: "grey",
        }}
      >
        <li
          style={{
            marginBottom: "20px",
          }}
        >
          A python script scrapes the front page headline from each source every
          day
        </li>
        <li
          style={{
            marginBottom: "20px",
          }}
        >
          The script stores the headlines in a MySQL database
        </li>
        <li
          style={{
            marginBottom: "20px",
          }}
        >
          A backend express server is used to serve the headlines to the
          frontend
        </li>
        <li
          style={{
            marginBottom: "20px",
          }}
        >
          The frontend sorts and displays the headlines
        </li>
      </ol>
      <Header>Sources</Header>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "50px",
          color: "grey",
        }}
      >
        <a
          href="https://www.cnn.com"
          target="_blank"
          style={{
            textDecoration: "underline",
            color: "grey",
            marginBottom: "10px",
          }}
        >
          CNN
        </a>
        <a
          href="https://www.foxnews.com"
          target="_blank"
          style={{
            textDecoration: "underline",
            color: "grey",
            marginBottom: "10px",
          }}
        >
          Fox News
        </a>{" "}
        <a
          href="https://www.npr.org"
          target="_blank"
          style={{
            textDecoration: "underline",
            color: "grey",
            marginBottom: "10px",
          }}
        >
          NPR
        </a>{" "}
        <a
          href="https://www.msnbc.com"
          target="_blank"
          style={{
            textDecoration: "underline",
            color: "grey",
            marginBottom: "10px",
          }}
        >
          MSNBC
        </a>{" "}
        <a
          href="https://www.thefederalist.com"
          target="_blank"
          style={{
            textDecoration: "underline",
            color: "grey",
            marginBottom: "10px",
          }}
        >
          The Federalist
        </a>{" "}
      </div>
      <Header>Links</Header>
      <Header
        style={{
          fontSize: "18px",
          fontWeight: "normal",
          marginBottom: "20px",
          marginTop: "0px",
          color: "grey",
        }}
      >
        <a
          href="https://www.google.com"
          style={{
            color: "grey",
          }}
          target="_blank"
        >
          Github
        </a>
      </Header>
      <Header></Header>
    </div>
  );
}
export default About;
