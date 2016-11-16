var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
 name: String,
 username: String,
 password: String,
 email: String,
 imgUrl: String,
 isAdmin: Boolean
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
