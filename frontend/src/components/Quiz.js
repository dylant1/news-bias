import React from "react";
import { useEffect, useState } from "react";
//create a quiz game where you are given a headline and you have to guess the source of the headline
import cnn from "../assets/cnn.png";
import fox from "../assets/fox.png";
// import nyt from "../assets/nyt.png";
import npr from "../assets/npr.png";
// import wsj from "../assets/wsj.png";
import fed from "../assets/thefederalist.png";
import msnbc from "../assets/msnbc.png";
import styled from "styled-components";
const Reset = styled.button`
  @media (min-width: 500px) {
    position: absolute;
    bottom: 15vh;
    left: 0;
    right: 0;
    margin: auto;

    &:hover {
    }
  }
  @media (max-width: 500px) {
    displah: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 10vh;
  }
  padding: 10px;
  borderradius: 10px;
  border: 1px solid;
  border-color: rgb(0, 191, 255);
  background-color: inherit;
  outline: none;
  font-size: 20px;
  color: rgb(0, 191, 255);
  cursor: pointer;
  border-radius: 10px;
  box-shadow: none;
`;
const Logo = styled.img`
  width: auto;
  height: 50px;
  margin: 10px;
  padding: 10px;
  border: 1px solid white;
  border-radius: 10px;
  cursor: pointer;
  &:active {
    border: 1px solid black;
  }
`;
const Header = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 35px;
  margin-top: 20px;
  text-align: center;
`;
function Quiz() {
  const [headlines, setHeadlines] = React.useState([]);
  const [currentHeadline, setCurrentHeadline] = React.useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/get-headlines")
      .then((res) => res.json())
      .then((data) => {
        setHeadlines(data);
      });
  }, []);
  function getRandomHeadline() {
    //get a random headline from the array
    //if the headlines exists then set the current headline to the random headline
    if (headlines.data) {
      const randomHeadline =
        headlines.data[Math.floor(Math.random() * headlines.data.length)];
      console.log(randomHeadline);
      setCurrentHeadline(randomHeadline);
    }
  }
  useEffect(() => {
    getRandomHeadline();
  }, [headlines]);

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
      }}
    >
      <Header
        style={{
          marginBottom: "10px",
        }}
      >
        Headline
      </Header>
      {/* {/* <button
        onClick={() => {
          getRandomHeadline();
        }}
      > 
        Get Random Headline
      </button> */}
      {currentHeadline && (
        <div
          style={{
            display: "inline-flex",
            flexDirection: "row",
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            border: "1px solid grey",
            borderRadius: "10px",
            marginTop: "20px",
            width: "100%",
          }}
        >
          {currentHeadline.headline}
        </div>
      )}
      {
        //make the player guess the source of the headline
        //display the logos of the sources and the player must click the correct source
        //if the player clicks the correct source then display a message saying the player got the correct answer
        //if the player clicks the wrong source then display a message saying the player got the wrong answer
      }
      <div
        style={{
          textAlign: "center",
          display: "block",
        }}
      >
        <div
          style={{
            color: "grey",
            marginTop: "50px",
            marginBottom: "20px",
          }}
        >
          Click on the source logo to guess the source of the headline
        </div>
        <Logo
          src={cnn}
          onClick={() => {
            if (currentHeadline.source === "CNN") {
              //display a message in green saying the player got the correct answer
              document.getElementById("correct-answer").style.display = "block";
              document.getElementById("wrong-answer").style.display = "none";
            } else {
              document.getElementById("wrong-answer").style.display = "block";
              document.getElementById("correct-answer").style.display = "none";
            }
          }}
        />
        <Logo
          src={fox}
          onClick={() => {
            if (currentHeadline.source === "Fox") {
              document.getElementById("correct-answer").style.display = "block";
              document.getElementById("wrong-answer").style.display = "none";
            } else {
              document.getElementById("wrong-answer").style.display = "block";
              document.getElementById("correct-answer").style.display = "none";
            }
          }}
        />
        <Logo
          src={npr}
          onClick={() => {
            if (currentHeadline.source === "NPR") {
              document.getElementById("correct-answer").style.display = "block";
              document.getElementById("wrong-answer").style.display = "none";
            } else {
              document.getElementById("wrong-answer").style.display = "block";
              document.getElementById("correct-answer").style.display = "none";
            }
          }}
        />
        <Logo
          src={fed}
          onClick={() => {
            if (currentHeadline.source === "The Federalist") {
              document.getElementById("correct-answer").style.display = "block";
              document.getElementById("wrong-answer").style.display = "none";
            } else {
              document.getElementById("wrong-answer").style.display = "block";
              document.getElementById("correct-answer").style.display = "none";
            }
          }}
        />
        <Logo
          src={msnbc}
          onClick={() => {
            if (currentHeadline.source === "MSNBC") {
              document.getElementById("correct-answer").style.display = "block";
              document.getElementById("wrong-answer").style.display = "none";
            } else {
              document.getElementById("wrong-answer").style.display = "block";
              document.getElementById("correct-answer").style.display = "none";
            }
          }}
        />
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          id="correct-answer"
          style={{
            color: "green",
            display: "none",
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          Correct!
        </div>
        <div
          id="wrong-answer"
          style={{
            color: "red",
            display: "none",
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          Incorrect
        </div>
        <Reset
          onClick={() => {
            getRandomHeadline();
            document.getElementById("correct-answer").style.display = "none";
            document.getElementById("wrong-answer").style.display = "none";
          }}
          style={
            {
              //position this at the bottom of the page
            }
          }
        >
          Reset
        </Reset>
      </div>
    </div>
  );
}

export default Quiz;
