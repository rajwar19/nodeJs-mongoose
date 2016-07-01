var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser'); // Body parser for fetch posted data
var Contact = require('./app/models/contact.js').Contact;
var contactController = require('./app/controller/contactController.js')(Contact);
mongoose.connect('mongodb://127.0.0.1:27017/nodedb-oauth2');

var userController = require('./app/controller/userController');
var authController = require('./app/controller/auth');
var passport = require('passport');
var clientController = require('./app/controller/client');
var session = require('express-session');
var oauth2Controller = require('./app/controller/oauth2');
var ejs = require('ejs');


var router = express.Router();              // get an instance of the express Router
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


var app = express();
app.use(express.static(__dirname+'/app'));
app.use(express.static(__dirname+'/public'));
//use bodyParser() to let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }))  
app.use(bodyParser.json());

app.use(passport.initialize());  //initialise passport auth middleware
app.set('view engine', 'ejs');
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

router.get('/', function(req, res) {
	  res.sendFile(path.join(__dirname + '/public/index.html'));
    //res.json({ message: 'hooray! welcome to our api!' });   
});


router.route('/users').post(userController.postUsers);
router.route('/users').get(authController.isAuthenticated,userController.getUsers);
// Create endpoint handlers for oauth2 authorize  // http://localhost:8080/oauth2/authorize/client_id=0123456789&redirect_uri=http://localhost:8080&response_type=code
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token  http://localhost:8080/api/oauth2/token
router.route('/oauth2/token').post(authController.isClientAuthenticated, oauth2Controller.token); 

// Create endpoint handlers for /clients 
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);


router.route('/contacts').get(authController.isAuthenticated, contactController.all);
router.route('/contactById').get(authController.isAuthenticated, contactController.select);
router.route('/contacts').post(authController.isAuthenticated,contactController.add);
router.route('/contacts').delete(authController.isAuthenticated,contactController.del);
router.route('/contacts').put(authController.isAuthenticated,contactController.update);


app.use('/api', router); // all of our routes will be prefixed with /api

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

