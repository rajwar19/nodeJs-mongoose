var express = require("express");
//var http = require("http");
//var mongodb = require('mongodb');
var mongoose = require("mongoose");
var router = express.Router();              // get an instance of the express Router
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

mongoose.connect('mongodb://127.0.0.1:27017/nodedb');

var app = express();
app.use(express.static(__dirname+'/app'));

var bodyParser = require('body-parser'); // Body parser for fetch posted data
app.use(bodyParser.urlencoded({ extended: false }))  


var Contact = require('./app/models/contact.js').Contact;
var contactController = require('./app/controller/contactController.js')(Contact);


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});



router.route('/contacts').get(contactController.all);
router.route('/contacts').post(contactController.add);



app.use('/api', router); // all of our routes will be prefixed with /api

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

