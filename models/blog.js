var mongoose = require("mongoose");
var Schema = mongoose.Schema;
User = require('./user');

var CommentsSchema = new Schema({
  user: {
       type: Schema.Types.ObjectId,
       ref: 'User'
     },
  commentBody: String
});

var BlogSchema = new Schema({
 blogBody: String,
 blogPoster: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
 blogComment: [CommentsSchema]
});

var Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
