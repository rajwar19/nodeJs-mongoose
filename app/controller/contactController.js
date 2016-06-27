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
	  var contact = req.body;
	    
      var modelContact = new Contact(); 
	  modelContact.name=contact.name;
	  modelContact.email=contact.email;
	  modelContact.phone=contact.phone;
	 	
	 modelContact.find(function (err, data) {
		 
	 });	
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
