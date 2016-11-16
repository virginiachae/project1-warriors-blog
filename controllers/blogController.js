var db = require('../models');


function index(req, res) {
db.Blog.find(function(err, blog){
    if (err) {
      return console.log(err);
    }

    res.json(blog);
  });
}











module.exports = {
  index: index,
  // create: create,
  // show: show,
  // destroy: destroy,
  // update: update
};
