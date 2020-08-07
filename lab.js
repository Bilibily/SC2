// actually this is the server side
//Challenge 6
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const con = mysql.createConnection({
    host: "10.11.90.16",
    user: "study",
    password: "Study1111%",
    database: "Study"
});

app.use(bodyParser.urlencoded({ extended: false }));
//extended: false, then you can only parse strings or arrays.
app.use(bodyParser.json());
//SQL

app.get('/que', function (req, res) {
    var obj = {
        Phone: req.query.Phone,
        Name: req.query.Name,

    };


    con.query("INSERT INTO SC7 VALUES(?,?)", [obj.Name, obj.Phone], function (err, result) {
        // res.json(result);
        //find the value
        console.log(result);
    })
});


app.listen(7777);

