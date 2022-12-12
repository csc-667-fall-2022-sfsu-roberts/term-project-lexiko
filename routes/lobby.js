// const express = require("express");
// const { router } = require("../app");

// const route = express.Router();



// router.get('/', protect, (req, res) =>  {
//     const {username, password} = req.body;
//     const {sessionID} = req.sessionID
//     req.session.authenticated = true;
//     req.session.username = username;
//     res.render('lobby', {username, sessionID})
// })



// module.exports = router;


var express = require('express');
const Games = require("../db/games");
var router = express.Router()


router.get('/', (req, res) => {
    // const {sessionID} = req;
    const {username, userID} = req.session;
    console.log("userID = " , userID)
    // res.render('protected/lobby', {username, userID});
    Games.all(userID)
    .then((games) => {
        console.log(games);
        res.render('protected/lobby', {username, userID, games});
    }).catch((error) => {
        console.log(error);
        res.redirect("error");
    });

    // res.render('protected/lobby', {username, userID});
});


module.exports = router;