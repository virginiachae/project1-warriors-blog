var db = require("./models");

var blogList = [{
    blogTitle: 'Our First Post',
    blogLink: 'http://www.nba.com/warriors/?tmd=1',
    blogDate: 'November 14, 2016',
    blogBody: 'hello word. welcome to our blog where we will be expressing our humble opinions and thoughts about the best basketball team on the planet: The Golden State Warriors. Enjoy!',
    blogPoster: 'vachae'
}]

var usersList = [{
    name: 'Jonathan Hall',
    username: 'jhall33',
    email: 'jonathanphall@me.com',
    imgUrl: 'http://www.vectortemplates.com/raster/batman/batman-logo-big.gif'
}, {
    name: 'Virgina Chae',
    username: 'vachae',
    email: 'chae.virginia@gmail.com',
    imgUrl: 'http://www.officialpsds.com/images/thumbs/Golden-State-Warriors-2013-14-Logo-psd95373.png'
}, {
    name: 'Justin Castillia',
    username: 'jcastillia33',
    email: 'jcastilla@fakeemail.com',
    imgUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/002/307/3bd6ee0.jpg'
}];

db.User.remove({}, function(err, users) {
    db.User.create(usersList, function(err, users) {
        if (err) {
            return console.log('ERROR', err);
        }

        db.Blog.remove({}, function(err, blogs) {
            blogList.forEach(function(blogData) {
                var blog = new db.Blog({
                    blogTitle: blogData.blogTitle,
                    blogLink: blogData.blogLink,
                    blogDate: blogData.blogDate,
                    blogBody: blogData.blogBody
                });
                db.User.findOne({
                    username: blogData.blogPoster,
                }, function(err, foundBlogPoster) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    blog.blogPoster = foundBlogPoster;
                    blog.save(function(err, savedBlog) {
                      if (err) {
                        return console.log('error!!!' + err);
                      }
                        console.log('this is the final blog' + savedBlog);
                    });
                });
            });


        });
    });
});
