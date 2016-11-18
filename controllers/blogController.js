var db = require('../models');


function index(req, res) {
    db.Blog.find({})
        .populate('blogPoster')
        .exec(function(err, success) {
            res.json(success);
        });
}

//   function(err, blog){
//     if (err) {
//       return console.log(err);
//     }
//
//     res.json(blog);
//   });
// }

function destroy(req, res) {

  db.Blog.findOneAndRemove({ _id: req.params.blogId }, function(err, foundBlog){
    // note you could send just send 204, but we're sending 200 and the deleted entity
    res.json(foundBlog);
  });
}

function show(req, res) {
  db.Blog.findById(req.params.blogId, function(err, foundBlog) {
    if(err) { console.log('blogController.show error', err); }
    console.log('blogController.show responding with', foundBlog);
    res.json(foundBlog);
  });
}

function update(req, res) {
  console.log('updating with data', req.body);
  var blogId = req.params.blogId;
  var bodyUpdate = req.body.blogBody;

  db.Blog.update({ _id: blogId }, {blogBody: bodyUpdate},{returnNewDocument: true, upsert: true}, function iUpdated(err, foundBlog){
    console.log("I updated to : ", foundBlog);
    db.Blog.findById(blogId, function sendBackToJon(err, blogForJon){
      if(err){return console.log(err);}
      res.json(blogForJon);
    });
  });

  // db.Blog.findById(req.params.blogId, function(err, foundBlog) {
  //   if(err) { console.log('blogController.update error', err); }
  //   req.body.blogBody = foundBlog.blogBody;
  //   // foundBlog.blogBody = req.body;
  //   console.log(req.body);
  //
  //   foundBlog.save(function(err, savedBlog) {
  //     if(err) { console.log('saving altered blog failed'); }
  //     res.json(savedBlog);
  //     console.log(savedBlog);
  //   });
  // });

}

// function create(req, res) {
//     db.Blog.findById(req.params.id)
//         .populate('blogPoster')
//         .exec(function(err, foundBlog) {
//             if (err) {
//                 console.log('error is: ', err);
//             } else {
//                 console.log(foundBlog);
//                 foundBlog.blogComment.push(req.body);
//                 foundBlog.save()
//                 res.json(foundBlog);
//             }
//         })
// }
//
//
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
    show: show,
    destroy: destroy,
    update: update
};
