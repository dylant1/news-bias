import { useEffect, useState } from "react";
import styled from "styled-components";
import cnn from "../assets/cnn.png";
import fox from "../assets/fox.png";
// import nyt from "../assets/nyt.png";
import npr from "../assets/npr.png";
// import wsj from "../assets/wsj.png";
import fed from "../assets/thefederalist.png";
import msnbc from "../assets/msnbc.png";
import Navbar from "./Navbar";

// TODO: Add icons for each source
// TODO: Dont repeat headlines
const Wrapper = styled.div`
  display: block;
  margin: 0 auto;
  width: 80%;
  height: 100%;
`;
const BlueWord = styled.span`
  color: #00ffff;
  &:hover {
    cursor: pointer;
  }
`;
const RedWord = styled.span`
  color: red;
  &:hover {
    cursor: pointer;
  }
`;
const GreenWord = styled.span`
  color: #7fff00;
  &:hover {
    cursor: pointer;
  }
`;
const YellowWord = styled.span`
  color: yellow;
  &:hover {
    cursor: pointer;
  }
`;
const Logo = styled.img`
  margin-right: 10px;
  margin-left: 10px;
`;
const LargeLogo = styled.img`
  margin-right: 10px;
  margin-left: 10px;
  width: 50px;
  height: 50px;
`;
const HeadlineContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  text-align: left;
  justify-content: center;
`;

const LogoContainer = styled.span`
  display: inline-flex;
  flex-direction: row;
`;
const Headline = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
const Header = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 35px;
  margin-top: 20px;
  text-align: center;
`;
const Redirect = styled.a`
  text-decoration: none;
  color: white;
`;

// const Tooltip = styled.div`
//   position: relative;
//   display: inline-block;
//   //make tooltip text appear on tooltip hover
//   &:hover .tooltiptext {
//     visibility: visible;
//   }
// `;
// const TooltipText = styled.span`
//   visibility: hidden;
//   background-color: #0e0e10;
//   color: white;
//   border: solid;
//   border-width: 1px;
//   border-color: white;
//   text-align: center;
//   border-radius: 6px;
//   padding: 5px 0;

//   position: absolute;
//   z-index: 1;
//   width: 150px;
//   bottom: 100%;
//   left: 50%;
//   margin-left: -75px;
// `;
const Filters = styled.div`
  margin-right: 15px;
  border-radius: 20px;
  border: 1px solid #ffffff;
  padding: 5px 10px;
  margin-bottom: 15px;

  &:hover {
    cursor: pointer;
  }
  user-select: none;
  font-size: 10px;
  align-items: center;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 20px;
  flex-wrap: wrap;
`;
function Home() {
  const [headlines, setHeadlines] = useState([]);
  const [todaysHeadlines, setTodaysHeadlines] = useState(0);
  const [covidWords, setCovidWords] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [filteredHeadlines, setFilteredHeadlines] = useState([
    "CNN",
    "Fox",
    "NPR",
    "The Federalist",
    "MSNBC",
  ]);
  const [keywordHighlight, setKeywordHighlight] = useState(true);
  function KeywordHighlightButton() {
    return (
      <FilterContainer
        style={{
          display: "flex",
        }}
      >
        <Filters
          style={{
            width: "100px",
            textAlign: "center",
            borderColor: keywordHighlight ? "#00bfff" : "#645394",
            color: keywordHighlight ? "#00bfff" : "#645394",
          }}
          onClick={() => setKeywordHighlight(!keywordHighlight)}
        >
          Keyword Highlight
        </Filters>
      </FilterContainer>
    );
  }
  function DisplayNewsSourceTags() {
    //get the headlines and display their sources
    //map theh headlines to display the sources
    const sources = ["CNN", "Fox", "NPR", "The Federalist", "MSNBC"];
    // useEffect(() => {
    //   //add all the sources to the array
    //   //map the array to display the sources
    //   sources.map((source) => {
    //     setFilteredHeadlines([...filteredHeadlines, source]);
    //   });
    // }, []);

    return (
      <FilterContainer>
        {sources.map((source) => {
          return (
            <FilterContainer key={source}>
              <Filters
                id={source}
                onClick={() => {
                  //if the source isnt in the filteredHeadlines array, add it
                  if (!filteredHeadlines.includes(source)) {
                    setFilteredHeadlines([...filteredHeadlines, source]);
                  } else {
                    setFilteredHeadlines(
                      filteredHeadlines.filter((item) => item !== source)
                    );
                  }
                }}
                style={{
                  borderColor: filteredHeadlines.includes(source)
                    ? "#ffffff"
                    : "grey",
                  color: filteredHeadlines.includes(source) ? "white" : "grey",
                }}
              >
                {source}
              </Filters>
            </FilterContainer>
          );
        })}
      </FilterContainer>
    );
  }

  const keyWords = {
    //liberal
    blue: [
      "harris",
      "biden",
      "kamala",
      "sanders",
      "pelosi",
      "obama",
      "barack",
      "democrat",
      "democrats",
      "left-wing",
    ],
    //conservative
    red: [
      "trump",
      "mccain",
      "warren",
      "booker",
      "gillibrand",
      "mueller",
      "republican",
      "republicans",
      "j6",
      "gop",
      "1-6",
      "1/6",
      "jan.",
      "6",
      "proud",
      "boy's",
    ],
    //covid
    green: [
      "covid",
      "coronavirus",
      "pandemic",
      "virus",
      "corona",
      "covid-19",
      "covid19",
      "virus'",
      "cases",
    ],
    //neutral
    yellow: ["election", "elections", "rigging"],
  };
  const keyWordLinks = {
    blue: {
      harris: "https://en.wikipedia.org/wiki/Kamala_Harris",
      biden: "https://en.wikipedia.org/wiki/Joe_Biden",
      kamala: "https://en.wikipedia.org/wiki/Kamala_Harris",
      sanders: "https://en.wikipedia.org/wiki/Bernie_Sanders",
      pelosi: "https://en.wikipedia.org/wiki/Nancy_Pelosi",
      obama: "https://en.wikipedia.org/wiki/Barack_Obama",
      barack: "https://en.wikipedia.org/wiki/Barack_Obama",
      democrat:
        "https://en.wikipedia.org/wiki/Democratic_Party_(United_States)",
      democrats:
        "https://en.wikipedia.org/wiki/Democratic_Party_(United_States)",
      warren: "https://en.wikipedia.org/wiki/Elizabeth_Warren",
      gillibrand: "https://en.wikipedia.org/wiki/Kirsten_Gillibrand",
      booker: "https://en.wikipedia.org/wiki/Cory_Booker",
      "left-wing":
        "https://en.wikipedia.org/wiki/Democratic_Party_(United_States)",
    },
    red: {
      trump: "https://en.wikipedia.org/wiki/Donald_Trump",
      mccain: "https://en.wikipedia.org/wiki/John_McCain",
      mueller: "https://en.wikipedia.org/wiki/Robert_Mueller",
      republican:
        "https://en.wikipedia.org/wiki/Republican_Party_(United_States)",
      republicans:
        "https://en.wikipedia.org/wiki/Republican_Party_(United_States)",
      j6: "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack",
      gop: "https://en.wikipedia.org/wiki/Republican_Party_(United_States)",
      "1-6": "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack",
      "1/6": "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack",
      jan: "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack",
      "jan.": "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack",
      6: "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack",
      proud: "https://en.wikipedia.org/wiki/Proud_Boys",
      "boy's": "https://en.wikipedia.org/wiki/Proud_Boys",
    },
    green: {
      covid: "https://en.wikipedia.org/wiki/Coronavirus",
      coronavirus: "https://en.wikipedia.org/wiki/Coronavirus",
      pandemic: "https://en.wikipedia.org/wiki/COVID-19_pandemic",
      virus: "https://en.wikipedia.org/wiki/Coronavirus",
      corona: "https://en.wikipedia.org/wiki/Coronavirus",
      covid: "https://en.wikipedia.org/wiki/Coronavirus",
      "covid-19": "https://en.wikipedia.org/wiki/COVID-19_pandemic",
      covid19: "https://en.wikipedia.org/wiki/COVID-19_pandemic",
      "virus'": "https://en.wikipedia.org/wiki/Coronavirus",
      cases: "https://en.wikipedia.org/wiki/Coronavirus",
    },
    yellow: {
      election: "https://en.wikipedia.org/wiki/Elections_in_the_United_States",
      elections: "https://en.wikipedia.org/wiki/Elections_in_the_United_States",
      rigging: "https://en.wikipedia.org/wiki/Electoral_fraud",
    },
  };
  // const keyWordDefinitions = {
  //   //create a dictionary of key words and their definitions
  //   blue: {
  //     harris: "test",
  //     biden: "President 2021-Present",
  //     kamala: "Vice President 2021-Present",
  //     sanders: "Senator 2020-Present",
  //     pelosi: "test",
  //     obama: "test",
  //     barack: "test",
  //     democrat: "test",
  //     democrats: "test",
  //   },
  //   red: {
  //     trump: `Republican Party \n President 2017-2021`,
  //     mccain: "test",
  //     warren: "test",
  //     booker: "test",
  //     gillibrand: "test",
  //     mueller: "test",
  //     republican: "Republican Party",
  //     republicans: "Republican Party",
  //     j6: "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack",
  //     gop: "Republican Party",
  //     "1-6": "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack",
  //     "1/6": "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack",
  //     jan: "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack",
  //     "jan.": "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack",
  //     6: "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack",
  //   },
  //   green: {
  //     covid: "test",
  //     coronavirus: "test",
  //     pandemic: "test",

  //     virus: "Coronavirus",
  //     corona: "Coronavirus",
  //     covid: "Coronavirus",
  //     "covid-19": "Coronavirus",
  //     covid19: "Coronavirus",
  //     "virus'": "Coronavirus",
  //   },
  //   yellow: {
  //     election: "test",
  //     elections: "test",
  //     rigging: "Allegations of manipulating votes",
  //   },
  // };

  useEffect(() => {
    fetch("http://localhost:4000/get-headlines")
      .then((res) => res.json())
      .then((data) => {
        setHeadlines(data);
        console.log(data);
      });
  }, []);
  // function checkIfWordIsInDictionary(word) {
  //   let lowercaseWord = word.toLowerCase();
  //   for (let key in keyWords) {
  //     if (keyWords[key].includes(lowercaseWord)) {
  //       return keyWordDefinitions[key][lowercaseWord];
  //     }
  //   }
  //   return null;
  // }
  function checkIfHeadlineContainsCovidWord(headline) {
    // see if headline contains any of the covid words
    let lowercaseHeadline = headline.toLowerCase();
    for (let key in keyWords.green) {
      if (lowercaseHeadline.includes(key)) {
        setCovidWords(covidWords + 1);
      }
    }
    return null;
  }
  function checkIfWordIsKeyWord(word) {
    if (keyWords.blue.includes(word.toLowerCase())) {
      return (
        // <Tooltip>
        keywordHighlight ? (
          <Redirect
            //find the word in the keyWordLinks dictionary
            href={keyWordLinks.blue[word.toLowerCase()]}
            target="_blank"
          >
            <BlueWord
              key={word}
              onMouseOver={() => {
                console.log("mouseover");
              }}
            >
              {word}&nbsp;
            </BlueWord>
          </Redirect>
        ) : (
          <span key={word}>{word} </span>
        )
        //   {/* <TooltipText className="tooltiptext">
        //     {checkIfWordIsInDictionary(word)}
        //   </TooltipText>
        // </Tooltip> */}
      );
    }
    if (keyWords.red.includes(word.toLowerCase())) {
      return keywordHighlight ? (
        <Redirect href={keyWordLinks.red[word.toLowerCase()]} target="_blank">
          <RedWord
            key={word}
            onMouseOver={() => {
              console.log("mouseover");
            }}
          >
            {word}&nbsp;
          </RedWord>
        </Redirect>
      ) : (
        <span key={word}>{word} </span>
      );
    }
    if (keyWords.green.includes(word.toLowerCase())) {
      return (
        // <Tooltip>
        keywordHighlight ? (
          <Redirect
            //find the word in the keyWordLinks dictionary
            href={keyWordLinks.green[word.toLowerCase()]}
            target="_blank"
          >
            <GreenWord
              key={word}
              onMouseOver={() => {
                console.log("mouseover");
              }}
            >
              {word}&nbsp;
            </GreenWord>
          </Redirect>
        ) : (
          <span key={word}>{word} </span>
        )

        //   {/* <TooltipText className="tooltiptext">
        //     {checkIfWordIsInDictionary(word)}
        //   </TooltipText>
        // </Tooltip> */}
      );
    }
    if (keyWords.yellow.includes(word.toLowerCase())) {
      return (
        // <Tooltip>
        keywordHighlight ? (
          <Redirect
            //find the word in the keyWordLinks dictionary
            href={keyWordLinks.yellow[word.toLowerCase()]}
            target="_blank"
          >
            <YellowWord
              key={word}
              onMouseOver={() => {
                console.log("mouseover");
              }}
            >
              {word}&nbsp;
            </YellowWord>
          </Redirect>
        ) : (
          <span key={word}>{word} </span>
        )

        //   <TooltipText className="tooltiptext">
        //     {checkIfWordIsInDictionary(word)}
        //   </TooltipText>
        // </Tooltip>
      );
    }
    return <span key={word}>{word} </span>;
  }
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let date = `${dd}-${mm}-${yyyy}`;

  function TodaysHeadlines() {
    return (
      <>
        <Header>Today's Headlines</Header>

        {headlines.data ? (
          <>
            {headlines.data.map((headline) => {
              return (
                //if the date of the headline is today, display it
                //if the headlines are in the filteredHeadlines array, display them
                filteredHeadlines.includes(headline.source) &&
                (headline.date === `${mm}-${dd}-${yyyy}` ? (
                  <span>
                    <span>
                      <HeadlineContainer>
                        <LogoContainer>
                          {displayLogo(headline.source, "50px")}
                        </LogoContainer>
                        <Headline
                          style={{
                            fontSize: "18px",
                          }}
                        >
                          {headline.headline.split(" ").map((word) => {
                            return checkIfWordIsKeyWord(word);
                          })}
                          {}
                        </Headline>
                      </HeadlineContainer>
                    </span>
                  </span>
                ) : //if the date of the headline is not today, don't display it
                null)
              );
            })}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  }
  //create a function to display the logo from the source of the headline
  function displayLogo(source, size) {
    if (source === "CNN") {
      return (
        <LargeLogo
          src={cnn}
          // set the size equal to the size argument
          style={{ width: "auto", height: size }}
        />
      );
    }
    if (source === "Fox") {
      return <LargeLogo src={fox} style={{ width: size, height: "auto" }} />;
    }
    if (source === "NPR") {
      return <LargeLogo src={npr} style={{ width: size, height: "auto" }} />;
    }
    if (source === "The Federalist") {
      return <LargeLogo src={fed} style={{ width: size, height: "auto" }} />;
    }

    if (source === "MSNBC") {
      return <LargeLogo src={msnbc} style={{ width: size, height: "auto" }} />;
    }
  }

  return (
    <Wrapper>
      {/* <div
        style={{
          marginBottom: "10px",
        }}
      >
        click to filter
      </div> */}
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          alignItems: "center",
          marginRight: "20px",
        }}
      > */}
      {/* <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            //set settings to the opposite of what it is
            setSettingsOpen(!settingsOpen);
          }}
        >
          {
            //create an input check box to toggle the settings
          }
        </span> */}
      {/* {settingsOpen ? <DisplayNewsSourceTags /> : null} */}
      <DisplayNewsSourceTags />

      <KeywordHighlightButton />
      {/* </div> */}
      <TodaysHeadlines />
      <Header
        style={{
          marginBottom: "10px",
        }}
      >
        Past Headlines
      </Header>
      {
        //if the data is not empty
        headlines.data &&
          headlines.data
            .sort((a, b) => b.id - a.id)
            //the slice determines the number of headlines to display
            .slice(todaysHeadlines, 50)
            .map((headline) => (
              <HeadlineContainer key={headline.id}>
                {
                  //if the date of the headline is today, display it
                  filteredHeadlines.includes(headline.source) &&
                    (headline.date !== `${mm}-${dd}-${yyyy}` ? (
                      <>
                        <LogoContainer>
                          {displayLogo(headline.source, "20px")}
                        </LogoContainer>

                        <Headline
                          style={{
                            color: "#C8C8C8		",
                          }}
                        >
                          {headline.headline.split(" ").map((word) => {
                            return checkIfWordIsKeyWord(word);
                          })}
                        </Headline>
                      </>
                    ) : //if the date of the headline is not today, don't display it
                    null)
                }
              </HeadlineContainer>
            ))
      }
    </Wrapper>
  );
}
export default Home;
