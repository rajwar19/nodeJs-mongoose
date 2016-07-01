var contactController = function(Contact){
	var all = function(req, res) {
	  Contact.find({userId: req.user._id}, function(err, contacts) {
	    if(!err) {
	      //res.json(200, { contacts: contacts }); // response for api
	      res.json(contacts);
	    } else {
	      res.json(500, { message: err });
	    }
	  });
	}
	
	
		var select = function(req, res) {
	   var id=req.query.id;
		Contact.find({ userId: req.user._id, _id:id }, function(err, data) {	   
			if(!err) {
				res.json(data);
			} else {
				res.json(500, { message: err });
			}
			});
		}
	
	var add = function(req, res) {
		var contact = req.body;
		Contact.findOne({ userId: req.user._id, name: req.body.name },'name',function (err, existing_contact) {
			if(!existing_contact && !err)	{
				var modelContact = new Contact(); 
				modelContact.name=contact.name;
				modelContact.email=contact.email;
				modelContact.phone=contact.phone;
				modelContact.userId = req.user._id;

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
			var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
            if(!req.body.id){
			var id=Base64.decode(req.query.id);
		    }else{
			var id=req.body.id;	
			}
			//console.log(id);return false;
			Contact.remove({userId: req.user._id, _id:id}, function(err,removed) {
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
			//console.log(id);
			var newdata={name:req.body.name,email:req.body.email,phone:req.body.phone};
		    Contact.findOne({ userId: req.user._id, _id: id },function(err,data){
			  if(!err && data){
				Contact.update({userId: req.user._id, _id:id},newdata,function(err,affected) {
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
		select:select,
        all: all,
        add: add,
        del:del,
        update:update
	}
}
module.exports = contactController;
