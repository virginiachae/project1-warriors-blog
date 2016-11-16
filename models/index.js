var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project1-warriors-blog");
module.exports.User = require('./user.js');
module.exports.Blog = require('./blog.js');
