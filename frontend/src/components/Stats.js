import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { keyWords } from "./Home";
const Header = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 35px;
  margin-top: 20px;
  text-align: center;
`;
function Stats() {
  const [headlines, setHeadlines] = useState([]);
  const [colors, setColors] = useState({
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0,
  });
  useEffect(() => {
    fetch("http://localhost:4000/get-headlines")
      .then((res) => res.json())
      .then((data) => {
        setHeadlines(data);
      });
  }, []);
  //count how many times each word appears in the headlines
  function countOccurences(headlines) {
    //split the headline data into individual headlines
    let headlineArray = headlines.map((headline) => headline.headline);
    //split the headline data into individual words
    let wordsArray = headlineArray.map((headline) => headline.split(" "));
    //flatten the array of words
    let words = wordsArray.flat();
    //count the number of times each word appears
    //make the words lowercase
    let wordCount = words.reduce((acc, curr) => {
      acc[curr.toLowerCase()] = (acc[curr.toLowerCase()] || 0) + 1;
      return acc;
    }, {});
    return wordCount;
  }
  function countColors(headlines) {
    let headlineArray = headlines.map((headline) => headline.headline);
    let wordsArray = headlineArray.map((headline) => headline.split(" "));
    let words = wordsArray.flat();
    let wordCount = words.reduce((acc, curr) => {
      acc[curr.toLowerCase()] = (acc[curr.toLowerCase()] || 0) + 1;
      return acc;
    }, {});
    let colors = {
      red: 0,
      blue: 0,
      green: 0,
      yellow: 0,
    };

    for (let key in wordCount) {
      if (keyWords.red.includes(key)) {
        colors.red += wordCount[key];
      } else if (keyWords.blue.includes(key)) {
        colors.blue += wordCount[key];
      } else if (keyWords.green.includes(key)) {
        colors.green += wordCount[key];
      } else if (keyWords.yellow.includes(key)) {
        colors.yellow += wordCount[key];
      }
    }
    return colors;
  }
  function getCategoryOfWordInKeyWords(word) {
    let category = "";
    keyWords.forEach((keyword) => {
      if (keyword.keywords.includes(word)) {
        category = keyword.category;
      }
    });
    return category;
  }
  function checkIfWordIsKey(object) {
    //the keywords object is made up of arrays of words
    //first, split the object into different arrays
    let keys = Object.keys(keyWords);
    //then, loop through each array
    //get the keys from the object and check if the word is in any of the arrays
    let keyWordsArray = keys.map((key) => keyWords[key]);
    let wordsInObject = Object.keys(object);
    let wordsInKeyWords = wordsInObject.filter((word) => {
      return keyWordsArray.some((keyWordArray) => {
        return keyWordArray.includes(word);
      });
    });
    return wordsInKeyWords;
  }

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Header>Stats</Header>
      <Header
        style={{
          fontSize: "18px",
          fontWeight: "normal",
          marginBottom: "20px",
          marginTop: "0px",
          textDecoration: "underline",
        }}
      >
        Most common key words
      </Header>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",

          width: "100%",
          textAlign: "left",
        }}
      >
        {
          // if the headlines have loaded, then show the stats
          headlines.data &&
            //loop through the words in the headlines
            Object.keys(countOccurences(headlines.data)).map((word) => {
              //only show the words that are in the keywords object
              if (
                checkIfWordIsKey(countOccurences(headlines.data)).includes(word)
                //only show the first 10 words
              ) {
                //return the first 10 words

                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      textAlign: "left",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <span>
                      {console.log(
                        checkIfWordIsKey(countOccurences(headlines.data))
                      )}
                      {
                        //if the word is in the keywords object, then get the index of the word in the the array of keywords
                        //if the index + 1 is 10 or less, then show the word
                        checkIfWordIsKey(
                          countOccurences(headlines.data)
                        ).indexOf(word) +
                          1 <=
                          10 &&
                          checkIfWordIsKey(
                            countOccurences(headlines.data)
                          ).indexOf(word) + 1
                      }
                      {checkIfWordIsKey(
                        countOccurences(headlines.data)
                      ).indexOf(word) +
                        1 <=
                        10 && (
                        //return the word and the number of times it appears
                        <span>.</span>
                      )}
                    </span>

                    <span
                      style={{
                        fontSize: "18px",
                        marginLeft: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      {checkIfWordIsKey(
                        countOccurences(headlines.data)
                      ).indexOf(word) +
                        1 <=
                        10 && (
                        //return the word and the number of times it appears
                        <span>{word}</span>
                      )}
                    </span>
                  </div>
                );
              }
            })
        }
      </div>

      <Header
        style={{
          fontSize: "18px",
          fontWeight: "normal",
          marginBottom: "20px",
          marginTop: "0px",
          textDecoration: "underline",
        }}
      >
        Key word categories
      </Header>
      <div>
        {
          //count the colors
          headlines.data &&
            //count the number of red words
            countColors(headlines.data).red +
              //count the number of blue words
              countColors(headlines.data).blue +
              //count the number of green words
              countColors(headlines.data).green +
              //count the number of yellow words
              countColors(headlines.data).yellow >
              0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    textAlign: "left",
                    alignItems: "center",
                    marginTop: "10px",
                    color: "red",
                  }}
                >
                  <span>
                    {countColors(headlines.data).red > 0 && (
                      <span>
                        {countColors(headlines.data).red}
                        {countColors(headlines.data).red > 1 && (
                          <span> conservative words</span>
                        )}
                        {countColors(headlines.data).red === 1 && (
                          <span> conservative word</span>
                        )}
                      </span>
                    )}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",

                    textAlign: "left",
                    alignItems: "center",
                    marginTop: "10px",
                    color: "#00ffff",
                  }}
                >
                  <span>
                    {countColors(headlines.data).blue > 0 && (
                      <span>
                        {countColors(headlines.data).blue}
                        {countColors(headlines.data).blue > 1 && (
                          <span> liberal words</span>
                        )}
                        {countColors(headlines.data).blue === 1 && (
                          <span> liberal word</span>
                        )}
                      </span>
                    )}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    textAlign: "left",
                    alignItems: "center",
                    marginTop: "10px",
                    color: "#7fff00",
                  }}
                >
                  <span>
                    {countColors(headlines.data).green > 0 && (
                      <span>
                        {countColors(headlines.data).green}
                        {countColors(headlines.data).green > 1 && (
                          <span> covid words</span>
                        )}
                        {countColors(headlines.data).green === 1 && (
                          <span> covid word</span>
                        )}
                      </span>
                    )}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    textAlign: "left",
                    alignItems: "center",
                    marginTop: "10px",
                    color: "yellow",
                  }}
                >
                  <span>
                    {countColors(headlines.data).yellow > 0 && (
                      <span>
                        {countColors(headlines.data).yellow}
                        {countColors(headlines.data).yellow > 1 && (
                          <span> neutral words</span>
                        )}
                        {countColors(headlines.data).yellow === 1 && (
                          <span> neutral word</span>
                        )}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            )
        }
      </div>
      <Header
        style={{
          fontSize: "18px",
          fontWeight: "normal",
          marginBottom: "20px",
          marginTop: "25px",
          textDecoration: "underline",
        }}
      >
        tests
      </Header>
    </div>
  );
}

export default Stats;
