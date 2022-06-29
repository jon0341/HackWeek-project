const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const { resourceLimits } = require("worker_threads");

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

    //established connection to db, perform qu
    connection.connect(function(error) {
        if(error) {
            console.log("error");
            console.log(error);
        }

        let id = req.body.id;

        let query1 = "SELECT EXISTS (SELECT * FROM employee_demographics where empID=" + id + ")";
        connection.query(query1, (error, result) => {
            console.log(result);
        });

        connection.query("UPDATE employee_demographics SET checked_in_status='yes' WHERE empID=" + id, (error, result) => {
            if(error)
            console.log(error);
        });

        connection.query("SELECT * FROM employee_demographics WHERE empID=" + id, (error, result) => {
            if(error)
            console.log(error);
            let h = "<h1>Employee Check-In</h1>";
            let str = "<table>";
            let row = '<th>First Name</th><th>Last Name</th><th>Age</th><th>Department</th><th>Checked In?</th>';
            for (let j = 0; j < result.length; j++) {
                row= row + '<tr>' + '<td>' + result[j].firstName + '</td>' + '<td>' + result[j].lastName + '</td>' + '<td>' + result[j].AGE+'</td>' + '<td>'+result[j].department+'</td>'
                + '<td>'+result[j].checked_in_status+'</td>';
            }
            str = str + row + '</table>';
        res.send(h + str);
        });

        /*(connection.query("SELECT * FROM employee_demographics", (error, result) => {
            if(error)
            console.log(error);
            console.table(result);
            console.log(result[1].AGE);
        });*/
    });
    });

const webserver = app.listen(5000, function(){
    console.log("node web server is running");
});