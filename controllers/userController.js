var db = require('../models');


function index(req, res) {
db.User.find(function(err, user){
    if (err) {
      return console.log(err);
    }

    res.json(user);
  });
}











module.exports = {
  index: index,
  // create: create,
  // show: show,
  // destroy: destroy,
  // update: update
};
