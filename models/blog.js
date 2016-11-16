var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var BlogSchema = new Schema({
 blogPoster: String,
 blogComment: String
});

var Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
