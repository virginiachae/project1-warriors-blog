var db = require("./models");



var blogList = [{
    blogBody: 'this is our first blog post. hello word.',
    blogPoster: 'jhall33'
}, {
    blogBody: 'this is the second... test test',
    blogPoster: 'vchae33'
}]

var db = require("./models");
var usersList = [{
    name: 'Jonathan Hall',
    username: 'jhall33',
    password: 'warriorsblog',
    email: 'jonathanphall@me.com',
    imgUrl: 'http://www.vectortemplates.com/raster/batman/batman-logo-big.gif',
    isAdmin: true;
}, {
    name: 'Virgina Chae',
    username: 'vchae33',
    password: 'warriorsblog',
    email: 'chae.virginia@gmail.com',
    imgUrl: 'http://www.officialpsds.com/images/thumbs/Golden-State-Warriors-2013-14-Logo-psd95373.png',
    isAdmin: true;
}, {
    name: 'Justin Castillia',
    username: 'jcastillia33',
    password: 'generalassembly',
    email: 'unknown',
    imgUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/000/002/307/3bd6ee0.jpg',
    isAdmin: false;
}, ];

db.User.remove({}, function(err, users) {
    db.User.create(usersList, function(err, users) {
        if (err) {
            return console.log('ERROR', err);
        }
        console.log("all users:", users);
        console.log("created", users.length, "users");
        process.exit();
    });
});

db.Blog.remove({}, function(err, blogs) {
    db.Blog.create(blogList, function(err, blogs) {
        if (err) {
            return console.log('ERROR', err);
        }
        console.log("all blogs:", blogs);
        console.log("created", blogs.length, "blogs");
        process.exit();
    });

});
