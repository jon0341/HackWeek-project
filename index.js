const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/employees', function(req, res) {


const mysql = require("mysql");

//config for database
const connection = mysql.createConnection({
host: "127.0.0.1",
user: "root",
password: "ObiMelvinRooMewTully12!!",
database: "employees"
})


//connecting to database
connection.connect(function(error) {
    if(error) {
        console.log("error");
        console.log(error);
    }
    console.log("connected!");

    let id = req.body.id;

    connection.query("SELECT EXISTS (SELECT * FROM employee_demographics where empID=999)", (error, result) => {
        console.log("record found!");
    });

    connection.query("UPDATE employee_demographics SET checked_in_status='yes' WHERE empID=" + id, (error, result) => {
        if(error)
        console.log(error);
    });

    connection.query("SELECT * FROM employee_demographics WHERE empID=" + id, (error, result) => {
        if(error)
        console.log(error);
    res.send(result);
    });

    connection.query("SELECT * FROM employee_demographics", (error, result) => {
        if(error)
        console.log(error);
        console.table(result);
    });
});
});

const webserver = app.listen(5000, function(){
    console.log("node web server is running");
});