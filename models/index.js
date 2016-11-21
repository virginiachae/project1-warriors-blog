var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/project1-warriors-blog");
module.exports.User = require('./user.js');
module.exports.Blog = require('./blog.js');
