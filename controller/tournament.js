var express = require('express');
var router  = express.Router();
var tournamentdb = require('../models/db');


/* View all tournaments in a <table> */
router.get('/all', function (req, res) {
     tournamentdb.GetAllTournaments(function (err, result) {
            if (err) throw err;
            res.render('displayTournamentTable.ejs', {rs: result});
        }
    );
});

/* View a single tournaments information */
router.get('/', function (req, res) {
    if(req.query.tournamentid == null) {
        res.redirect('/tournament/all');
    }
    else {
        tournamentdb.GetTournamentByID(req.query.tournamentid, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original user id in case there were no results
                res.render('displayTournamentInfo.ejs', {rs: result, tournamentid: req.query.tournamentid});
            }
        );
    }
});

// Create Tournament Form
router.get('/add', function(req, res){
    res.render('addTournamentForm.ejs', {action: '/tournament/add'});
});

// Save Tournament information
router.post('/add', function (req, res) {
     tournamentdb.InsertTournament( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result.insertId!== 'undefined') {
                 tournamentdb.GetTournamentByID(result.insertId, function(err, result){

                    res.render('displayTournamentInfoSnippet.ejs', {rs: result, tournamentid: result.insertId});

                });
            }
            else {
                res.send('Tournament was not inserted.');
            }
        }
    );
});

/* View all users in a drop down menu */
router.get('/dropdown', function (req, res) {
     tournamentdb.GetAllTournamentsView(function (err, result) {
            if (err) throw err;
            res.render('displayTournamentDropDown.ejs', {rs: result});
        }
    );
});

module.exports = router;

