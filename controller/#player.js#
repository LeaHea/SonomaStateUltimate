var express = require('express');
var router = express.Router();
var playerdb = require('../models/db');


/* View all users in a <table> */
router.get('/all', function (req, res) {
    playerdb.GetAllPlayers(function (err, result) {
            if (err) throw err;
            res.render('displayPlayerTable.ejs', {rs: result});
        }
    );
});


/* View a single players information */
router.get('/', function (req, res) {
    if(req.query.playerid == null) {
        console.log(req.query);
          res.redirect('/player/all');

    }
    else {
        console.log(req.query.playerid);
        playerdb.GetPlayerByID(req.query.playerid, function (err, result) {
        console.log(req.query.playerid);
                if (err) throw err;

                // Send result to the template along with the original user id in case there were no results
                res.render('displayPlayerInfo.ejs', {rs: result, usau_number: req.query.playerid});
            }
        );
    }
});

// Create Player Form
router.get('/create', function(req, res){
    res.render('createPlayerForm.ejs', {action: '/player/create'});
});

router.get('/delete', function(req, res){
    console.log(req.query.usau_number);
    playerdb.DeletePlayer( req.query, function (err, result) {
        if (err) {
            console.log(req.query.USAU_number);
            throw err;
        }
        res.render('deletePlayerForm.ejs', {action: '/player/delete'});
    });
});
router.get('/edit', function(req, res){
     console.log(req.query);
     playerdb.GetPlayerByID(req.query.usau_number, function (err, result) {
        console.log(result);
            if (err) throw err;

            // Send result to the template along with the original user id in case there were no results
            res.render('editPlayerForm.ejs', {action: '/player/update', res: result, });               }
             );
 });

// Save Player information
router.post('/update', function (req, res) {

    playerdb.UpdatePlayer( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(req.body.usau_number);

            if(typeof result.insertId!== 'undefined') {
                playerdb.GetPlayerByID(req.body.usau_number, function(err, result){
                    res.render('displayEditedPlayer.ejs', {rs: result, playerid: req.body.usau_number});

                });
            }
            else {
                res.send('Player was not inserted.');
            }
        }
    );
});

// Save Player information
router.post('/create', function (req, res) {
    playerdb.InsertPlayer( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(req.body.usau_number);

            if(typeof result.insertId!== 'undefined') {
                playerdb.GetPlayerByID(req.body.usau_number, function(err, result){
                    res.render('displayPlayerInfoSnippet.ejs', {rs: result, playerid: req.body.usau_number});

                });
            }
            else {
                res.send('Player was not inserted.');
            }
        }
    );
});

/* View all players in a drop down menu */
router.get('/dropdown', function (req, res) {
    playerdb.GetAllPlayersView(function (err, result) {
            if (err) throw err;
            res.render('displayPlayerDropDown.ejs', {rs1: result});
        }
    );
});

module.exports = router;

