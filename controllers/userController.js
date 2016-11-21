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

module.exports = {
    index: index,
    create: create,
};
