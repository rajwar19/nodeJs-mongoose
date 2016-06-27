var contactController = function(Contact){
	var all = function(req, res) {
	  Contact.find({}, function(err, contacts) {
	    if(!err) {
	      res.json(200, { contacts: contacts });  
	    } else {
	      res.json(500, { message: err });
	    }
	  });
	}
	
	var add = function(req, res) {
		//console.log(req.body);return false;
		//var name = req.body.name; 
	  //var isbn = req.body.isbn; 
	  //var author = req.body.author; 
	  //var pages = req.body.pages;    
	  //var description = req.body.description;  
	  //var added_date = req.body.added_date;
	  var contact = req.body;
	    
var modelContact = new Contact(); 
	  modelContact.name=contact.name;
	  modelContact.email=contact.email;
	  modelContact.phone=contact.phone;
	 	
	  modelContact.save(function (err, data) {
		if(!err) {
	          res.json(200, { message: "Contact created with name: " + contact.name });    
	        } else {
	          res.json(500, { message: "Could not create a Contact. Error: " + err });
	        }
		});
	}
	
	
	return {
        all: all,
        add: add,
	}
}
module.exports = contactController;
