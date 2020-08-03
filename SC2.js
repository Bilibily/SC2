const express = require('express');
const app = express();
const fs = require("fs");

// document.getElementsByTagName('body')[0].innerHTML;

app.get('/abc', function (req, res) {
     // res.send('Welcome to refer my html file content!');

    fs.readFile("Sc2-file.html", 'utf8', function(err, buf) {
        res.setHeader("Content-Type", "text/html");
        res.end(buf);
        console.log(buf);

    });


});

app.listen(3008, function () {
    console.log('Example app listening on port 3008!')
});

