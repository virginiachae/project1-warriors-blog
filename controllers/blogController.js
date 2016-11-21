var db = require('../models');

function index(req, res) {
    db.Blog.find({})
        .populate('blogPoster')
        .exec(function(err, success) {
            res.json(success);
        });
};

function destroy(req, res) {
    db.Blog.findOneAndRemove({
        _id: req.params.blogId
    }, function(err, foundBlog) {
        res.json(foundBlog);
    });
};

function show(req, res) {
    db.Blog.findById(req.params.blogId, function(err, foundBlog) {
        if (err) {
            console.log('blogController.show error', err);
        }
        res.json(foundBlog);
    });
};

function update(req, res) {
    var blogId = req.params.blogId;
    var bodyUpdate = req.body.blogBody;
    db.Blog.update({
        _id: blogId
    }, {
        blogBody: bodyUpdate
    }, {
        returnNewDocument: true,
        upsert: true
    }, function iUpdated(err, foundBlog) {
        db.Blog.findById(blogId, function sendBackToJon(err, blogForJon) {
            if (err) {
                return console.log(err);
            }
            res.json(blogForJon);
        });
    });
};

function createComment(req, res) {
    db.Blog.findById(req.params.id)
        .populate('blogPoster')
        .exec(function(err, foundBlog) {
            if (err) {
                console.log('error is: ', err);
            } else {
                foundBlog.blogComment.unshift(req.body);
                foundBlog.save()
                res.json(foundBlog);
            };
        });
};

function create(req, res) {
    var newPost = new db.Blog({
        blogTitle: req.body.blogTitle,
        blogLink: req.body.blogLink,
        blogDate: req.body.blogDate,
        blogBody: req.body.blogBody
    });
    db.User.findOne({
        username: req.body.blogPoster,
    }, function(err, foundBlogPoster) {
        if (err) {
            console.log(err);
            return;
        }
        newPost.blogPoster = foundBlogPoster;
        newPost.save(function(err, post) {
            if (err) {
                console.error(err);
            }
            res.json(post);
        });
    });
};

module.exports = {
    index: index,
    create: create,
    createComment: createComment,
    show: show,
    destroy: destroy,
    update: update
};
