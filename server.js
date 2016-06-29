var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();              // get an instance of the express Router
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

mongoose.connect('mongodb://127.0.0.1:27017/nodedb');

var app = express();
app.use(express.static(__dirname+'/app'));
//app.use(express.static(__dirname+'/app/views/login.html'));
app.use(express.static(__dirname+'/public'));

var bodyParser = require('body-parser'); // Body parser for fetch posted data

//use bodyParser() to let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }))  
app.use(bodyParser.json());

var Contact = require('./app/models/contact.js').Contact;
var contactController = require('./app/controller/contactController.js')(Contact);
require('./route/route.js')(router,contactController); //call router.js

router.get('/', function(req, res) {
	  res.sendFile(path.join(__dirname + '/public/index.html'));
    //res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router); // all of our routes will be prefixed with /api

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

