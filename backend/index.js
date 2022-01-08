let mysql = require("mysql");
let express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!Rund0ntst0p",
});
const headlines = {};
app.get("/get-headlines", (req, res) => {
  connection.query("SELECT * FROM headlines", (err, data) => {
    headlines.data = data;
    res.send(headlines);
  });
  // res.send({
  //   data: [
  //     {
  //       id: 1,
  //       headline: "Headline 1",
  //       url: "https://www.google.com",
  //     },
  //     {
  //       id: 2,
  //       headline: "Headline 2",
  //       url: "https://www.google.com",
  //     },
  //   ],
  // });
});
//send the data to the frontend

app.listen(4000, function () {
  console.log("Server started on port 4000");
  connection.connect(function (err) {
    if (err) throw err;

    console.log("Connected!");
    //connect to express

    // use the database news_scraper
    // get the values from teh table headlines and display them
    connection.query("USE news_scraper", function (err, result) {
      if (err) throw err;
      console.log("Using news_scraper");
      // get the values from the table headlines and display them
      connection.query("SELECT * FROM headlines", function (err, result) {
        if (err) throw err;
        //return the result
      });
    });
  });
});
