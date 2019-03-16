var express = require('express');
var router = express.Router();
var VerifyToken = require('./../services/verifyToken');
var Product = require('../models/Product.js');

/* GET ALL PRODUCTS */
router.get('/', VerifyToken, function(req, res, next) {
    Product.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET SINGLE PRODUCT BY ID */
router.get('/:id', VerifyToken, function(req, res, next) {
    Product.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE PRODUCT */
router.post('/', VerifyToken, function(req, res, next) {
    Product.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE PRODUCT */
router.put('/:id', function(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE PRODUCT */
router.delete('/:id', VerifyToken, function(req, res, next) {
    Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;