import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { createGlobalStyle } from "styled-components";
import Stats from "./components/Stats";
import Quiz from "./components/Quiz";
import About from "./components/About";
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #0E0E10;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
    color: #E4E6EB;
  }
`;

// TODO: Add icons for each source
// TODO: Dont repeat headlines

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <hr
        style={{
          color: "#E4E6EB",
          backgroundColor: "#E4E6EB",
          height: "1px",
          border: "none",
          marginBottom: "40px",
          padding: "0",
          width: "80%",
        }}
      />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/stats" element={<Stats />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
        <Route path="/about" element={<About />}></Route>
        
      </Routes>
    </>
  );
}

export default App;
