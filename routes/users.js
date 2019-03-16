var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var VerifyToken = require('./../services/verifyToken');
var bcrypt = require('bcryptjs');
var User = require('../models/User.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
            name : req.body.name,
            email : req.body.email,
            admin : req.body.admin,
            password : hashedPassword
        },
        function (err, user) {
            if (err) {
                return res.json({
                    type: false,
                    message: "Error, Unable to proceed."
                })
            }
            return res.json({
                type: true,
                data: {},
                message: "User registered sucessfully"
            })
        });
});

router.get('/getAllUsers', VerifyToken, function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).json({
            type: false,
            message: "SomeThing Went Wrong !!"
        });
        if (!user) return res.status(404).send({
            type: false,
            message: "Not Found !!"
        });
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({
            type: false,
            message: "UserName and Password not Match !!"
        });
        var token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({
            type: false,
            token: token
        });
    });
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;
