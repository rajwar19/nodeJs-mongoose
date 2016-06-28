var express = require("express");
//var http = require("http");
//var mongodb = require('mongodb');
var mongoose = require("mongoose");
var router = express.Router();              // get an instance of the express Router
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

mongoose.connect('mongodb://127.0.0.1:27017/nodedb');

var app = express();
app.use(express.static(__dirname+'/app'));
app.use(express.static(__dirname+'/public'));

var bodyParser = require('body-parser'); // Body parser for fetch posted data

//use bodyParser() to let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }))  
app.use(bodyParser.json());

var Contact = require('./app/models/contact.js').Contact;
var contactController = require('./app/controller/contactController.js')(Contact);


router.get('/', function(req, res) {
	  res.sendFile(path.join(__dirname + '/public/index.html'));
    //res.json({ message: 'hooray! welcome to our api!' });   
});



router.route('/contacts').get(contactController.all);
router.route('/contactById').get(contactController.select);
router.route('/contacts').post(contactController.add);
router.route('/contacts').delete(contactController.del);
router.route('/contacts').put(contactController.update);



app.use('/api', router); // all of our routes will be prefixed with /api

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

