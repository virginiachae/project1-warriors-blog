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









module.exports = {
    index: index,
    // create: create,
    // show: show,
    // destroy: destroy,
    // update: update
};
