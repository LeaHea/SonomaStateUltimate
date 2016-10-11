var express = require('express');
var router = express.Router();
var ratingdb = require('../models/db');


/* View all ratings in a <table> */
router.get('/all', function (req, res) {
     ratingdb.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayRatingTable.ejs', {rs: result});
        }
    );
});


/* View a single ratings information */
router.get('/', function (req, res) {
    if(req.query.ratingid == null) {
        res.redirect('/rating/all');
    }
    else {
        ratingdb.GetRatingByID(req.query.ratingid, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original user id in case there were no results
                res.render('displayRatingInfo.ejs', {rs: result, ratingid: req.query.ratingid});
            }
        );
    }
});

// Create Rating Form
router.get('/add', function(req, res){
    ratingdb.GetAllTournaments(function (err, result)
    {
        if (err) throw err;
        ratingdb.GetAllUsers(function (err, result1)
        {
            if (err) throw err;
            res.render('addRatingForm.ejs', {action: '/rating/add', rs: result, rs1: result1});
        });
    });

});

// Save Rating information
router.post('/add', function (req, res) {
     ratingdb.InsertRating( req.body, function (err, result2) {
            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result2.insertId!== 'undefined') {
                 ratingdb.GetRatingByID(result2.insertId, function(err, result){

                    res.render('displayRatingInfoSnippet.ejs', {rs2: result2, ratingid: result2.insertId});

                });
            }
            else {
                res.send('Rating was not inserted.');
            }
        }
    );
});

/* View all ratings in a drop down menu */
router.get('/dropdown', function (req, res) {
     ratingdb.GetAllRatingsView(function (err, result) {
            if (err) throw err;
            res.render('displayRatingDropDown.ejs', {rs: result});

        }
    );

});

module.exports = router;

