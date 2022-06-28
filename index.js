const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//app.post('/Employees', function(req, res) {

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

    //let id = req.body.id;
    //console.log(id);

    connection.query("SELECT * FROM employee_demographics WHERE empID=1001", function(error, result) {
        if(error)
        console.log(error);

    console.table(result);
    
    //res.send(result);
    });
});
//});

const webserver = app.listen(5000, function(){
    console.log("node web server is running");
});