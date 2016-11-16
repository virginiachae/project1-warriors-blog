var db = require("./models");

var blogsList = [
    {
      blogPoster: 'Justin',
      blogComment: 'The Warriors Stink'
  },
  {
    blogPoster: 'Jean',
    blogComment: 'The Warriors are the greatest what are you talking about?!'
  },
  {
    blogPoster: 'Andrew',
    blogComment: 'I do not follow sport I am not sure why I am here'
  },

];


db.Blog.remove({}, function(err, blogs) {

	db.Blog.create(blogsList, function(err, blogs) {
		if (err) {
			return console.log('ERROR', err);
		}
		console.log("all blogs:", blogs);
		console.log("created", blogs.length, "blogs");
		process.exit();
	});

});
