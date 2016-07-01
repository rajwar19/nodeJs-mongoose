var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var contactSchema   = new Schema({
    name: String,
    email: String,
    phone: Number,
    userId: String
});
var collectionName = 'contact';  // mongoose pluralizes collections. You can either rename it in mongodb to "contacts" or tell mongoose about it.
var Contact = mongoose.model('contact', contactSchema,collectionName);
module.exports = {
  Contact: Contact
};
