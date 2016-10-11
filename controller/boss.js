var express = require('express');
var router  = express.Router();
var bossdb = require('../models/db');


/* View all bosss in a <table> */
router.get('/all', function (req, res) {
     bossdb.GetAllBosses(function (err, result) {
            if (err) throw err;
            res.render('displayBossTable.ejs', {rs: result});
        }
    );
});

/* View a single bosss information */
router.get('/', function (req, res) {

    console.log("before");
    console.log(req.query);
    console.log("after");
    if(req.query.bossid == null) {
        res.redirect('/boss/all');
    }
    else {
        bossdb.GetBossByID(req.query.bossid, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original user id in case there were no results
                res.render('displayBossInfo.ejs', {rs: result, bossid: req.query.bossid});
            }
        );
    }
});

// Create Boss Form
router.get('/add', function(req, res){
        bossdb.GetAllPlayers(function (err, result1)
        {
            if (err) throw err;
            res.render('addBossForm.ejs', {action: '/boss/add', rs1: result1});
        });
});

// Save Boss information
router.post('/add', function (req, res) {
     bossdb.InsertBoss( req.body, function (err, result) {
     console.log(req.body);

            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result.insertId!== 'undefined') {
                 bossdb.GetBossByID(req.body.usau_number, function(err, result){

                    res.render('displayBossInfoSnippet.ejs', {rs: result, bossid: result});

                });
            }
            else {
                res.send('Boss was not inserted.');
            }
        }
    );
});

/* View all users in a drop down menu */
router.get('/dropdown', function (req, res) {
     bossdb.GetAllBossesView(function (err, result) {
            if (err) throw err;
            res.render('displayBossDropDown.ejs', {rs: result});
        }
    );
});

module.exports = router;

