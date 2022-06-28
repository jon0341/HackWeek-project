//access drivers
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
    connection.query("SELECT * FROM employee_demographics", function(error, result, fields) {
        if(error)
        console.log(error);
        console.table(result);
    })
});
