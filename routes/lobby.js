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
var router = express.Router()


router.get('/', (req, res) => {
    const {sessionID} = req;
    const {username} = req.session;

    res.render('protected/lobby', {username, sessionID});
});


module.exports = router;