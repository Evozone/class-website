//Importing Express Module
const express = require("express");

//Importing Database
const admin = require("firebase-admin");
const db = require("./db");

//Initialising Express
const app = express();

// Configuring Express
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Creating APIs

//GET request to display our todo list
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//POST request to create a new task in todo list
app.post("/tools", (req, res) => {
    //Code to add a new data to the database will go here
});

//POST request to delete a task in todo list
app.post("/timeline", (req, res) => {
    //Code to delete a data from the database will go here
});

// Detect port number from the Node Server or use 5000
const PORT = process.env.PORT || 5000;

// Listen for URIs on a port
app.listen(PORT, () => console.log(`Server started at ${PORT}`));