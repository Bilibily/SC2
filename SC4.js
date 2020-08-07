//Load the packages I need
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

//connect to my database
const connection = mysql.createConnection({
    user: 'study',
    password: 'Study1111%',
    host: '10.11.90.16',
    database: 'Study',
    port:'3306',
});

//let Express know I'll be using some of its packages

const app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//connect to my HTML file
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/SC4.html'));
});
// I need to now handle the POST request, basically what happens here
// is when the client enters their details in the login form and clicks the submit button,
// the form data will be sent to the server,
// and with that data our login script will check in our MySQL accounts table
// to see if the details are correct.
app.post('/auth', function(request, response) {
    const username = request.body.username;
    console.log(username);
    const password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM SC4 WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0 ) {
                request.session.loggedin = true;//1
                request.session.username = username;//2
                response.redirect('/home');//3
                //if the length>0, which means the username and the password match what is in the database, the codes below will run.
                // 1 meant to make true be the value of the request.session.loggedin
                // 2 meant to make username be the value of the request.session.username
                // 3 meant to make /home be the vale of response.redirect. 3 let the web page change to the /home
            } else {

                connection.query('SELECT * FROM SC4 WHERE username = ?', [username], function(error, results, fields) {
                    if (results.length > 0 ) {
                        response.send('Incorrect password');//3
                        response.end();
                    } else {
                        response.send('Incorrect username');//3
                        response.end();
                    }
                });

            }

        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});
app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

app.listen(3000);