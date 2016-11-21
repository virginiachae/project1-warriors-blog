var db = require('../models');

function index(req, res) {
    db.User.find(function(err, user) {
        if (err) {
            return console.log(err);
        }
        res.json(user);
    });
};

function create(req, res) {
    var newUser = new db.User(req.body);
    newUser.save(function(err, user) {
        if (err) {
            console.error(err);
        }
        res.json(user);
    });

};

function destroy(req, res) {

    db.User.findOneAndRemove({
        _id: req.params.userId
    }, function(err, foundUser) {
        res.json(foundUser);
    });
}

module.exports = {
  index: index,
  create: create,
  destroy: destroy,
};
