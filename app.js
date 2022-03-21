//Importing Express Module
const express = require("express");
const bodyParser = require('body-parser');
const https = require('https');

//Importing Database
const admin = require("firebase-admin");
const db = require("./db");

//Initialising Express
const app = express();

// Configuring Express
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Creating APIs
// const url = 'https://ptb.discord.com/api/guilds/804986812425699339/widget.json';
// https.get(url, (response) => {
//     console.log(response);
// })

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/tools", (req, res) => {
    res.sendFile(__dirname + "/tools.html");
});

app.get("/timeline", (req, res) => {
    res.sendFile(__dirname + "/timeline.html");
});

// Detect port number from the Node Server or use 5000
const PORT = process.env.PORT || 5000;

// Listen for URIs on a port
app.listen(PORT, () => console.log(`Server started at ${PORT}`));