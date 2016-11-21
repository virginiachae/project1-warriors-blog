var express = require('express');
// generate a new express app and call it 'app'
var app = express();


// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');


app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/mainView.html');
});


app.get('/onlyUsAdminsKnow', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/createPost', function homepage (req, res) {
  res.sendFile(__dirname + '/views/createPost.html');
});

app.get('/teamfeed', function homepage (req, res) {
  res.sendFile(__dirname + '/views/teamFeed.html');
});




app.get('/api/users', controllers.user.index);

app.get('/api/blogs', controllers.blog.index);

app.post('/api/users', controllers.user.create);

app.get('/api/blogs/:blogId', controllers.blog.show);

app.delete('/api/blogs/:blogId', controllers.blog.destroy);

app.put('/api/blogs/:blogId', controllers.blog.update);

app.post('/api/blogs/:id/comments', controllers.blog.createComment);

app.post('/api/blogs/', controllers.blog.create);

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
