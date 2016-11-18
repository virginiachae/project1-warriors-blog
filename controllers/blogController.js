var db = require('../models');


function index(req, res) {
    db.Blog.find({})
        .populate('blogPoster')
        .exec(function(err, success) {
            res.json(success);
        });
}

function create(req, res) {
    db.Blog.findById(req.params.id)
        .populate('blogPoster')
        .exec(function(err, foundBlog) {
            if (err) {
                console.log('error is: ', err);
            } else {
                console.log(foundBlog);
                foundBlog.blogComment.push(req.body);
                foundBlog.save()
                res.json(foundBlog);
            }
        })
}







module.exports = {
    index: index,
    create: create,
    // show: show,
    // destroy: destroy,
    // update: update
};
