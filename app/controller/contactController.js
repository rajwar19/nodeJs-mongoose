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
		Contact.findOne({ 'name': req.body.name },'name',function (err, existing_contact) {
			if(!existing_contact && !err)	{
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
			}else{
				res.json(500, { message: "Contact name  :" + contact.name +" Already Exists"});    
			}	
		});
	}


		var del=function(req, res) {
			var id=req.body.id;
			Contact.remove({'_id':id}, function(err,removed) {
			if(!err && removed){
			  res.json(200, { message: "Contact has been deleted " });  
			}else if(!err && !removed){
			  res.json(200, { message: "id : "+id+" doesn't exist" });    
			}else{
			  res.json(500, { message: "some error occur"});  
			}
		  });
		}
		
		var update = function(req, res) {
			var id=req.body.id;  
		    var newdata={name:req.body.name,email:req.body.email,phone:req.body.phone};
		    Contact.findById(id,function(err,data){
			  if(!err && data){
				Contact.update({'_id':id},newdata,function(err,affected) {
						if(!err && affected){
						 res.json(200, { message: "Contact updated sucessfully" });
						}else{
						 res.json(500, { message: "some error occur"});  	
						}
					});  
			   }else{
				 res.json(500, { message: "id : "+id+" doesn't exist" });    
			   }
			 });
		}	
	
	return {
        all: all,
        add: add,
        del:del,
        update:update
	}
}
module.exports = contactController;
