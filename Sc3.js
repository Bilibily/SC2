const express = require('express');
const app = express();
const sql = require("mysql");

// config for your database
const config = {
    user: 'AppUser',
    password: 'Special888%',
    host: 'localhost',
    database: 'Study',
    port:'3306'
};

// connect to your database
const conn = sql.createConnection(config, function (err) {
    console.log("Connection is running successfully!");

    if (err) throw err;

});



const ASC = "SELECT COUNT (*) as 'ABC' FROM Study.Country WHERE Continent = 'AS'";

app.get('/count', function (req, res){

    // query to the database and get the records
    conn.query(ASC, function (err, records) {

        if (err) console.log(err);
        console.log(records);
        console.log(records[0]);
        console.log(records[0].ABC);
        res.send("Total countries in Asia is " +records[0].ABC + " !");

    });


});

const server = app.listen(3008, function () {
    console.log('Server is running..');
});
