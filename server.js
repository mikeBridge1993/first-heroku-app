const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

//app.get('/bad', (req, res) => {
//   res.send({
//       errorMessage: "You suck so much",
//       salary: 2000,
//       currency: "euros"
//   }); 
//});

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs);


app.use((req, res, next) => {
    var now =  new Date().toString();
    var log = now + ":" + req.method + " " + req.url
    console.log(log);
    
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    
    next();
});


//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle:'About Page',
        currentYear: 2017,
        welcomeMessage: "Welcome About Sanitarium",
        color: "grey"
    })
});

app.get('/', (req, res) =>{
    res.render('home.hbs', {
        pageTitle:'Home Page',
        currentYear: 2017,
        welcomeMessage: "Welcome Home Sanitarium",
        color: "blue"
    })
});



app.listen(port,() => {
    console.log("Server is up on port " + port)
});