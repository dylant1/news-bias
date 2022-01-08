import React from "react";

//create a basic about page

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>
        This is a simple app that pulls news headlines from the following
        sources:
        <br />
        <br />
        <ul>
          <li>
            <a href="https://www.cnn.com/">CNN</a>
          </li>
          <li>
            <a href="https://www.bbc.com/">BBC</a>
          </li>
          <li>
            <a href="https://www.nytimes.com/">NYT</a>
          </li>
          <li>
            <a href="https://www.foxnews.com/">FOX</a>
          </li>
          <li>
            <a href="https://www.nbcnews.com/">NBC</a>
          </li>
          <li>
            <a href="https://www.washingtonpost.com/">WP</a>
          </li>
        </ul>
      </p>
    </div>
  );
}
export default About;
