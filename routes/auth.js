var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = import('crypto');
var bcrypt = require('bcrypt')
var db = require('../db');
var router = express.Router()
const saltRounds = 10;

const Users = require("../db/users");
const { request } = require('http');


router.get('/login', (req, res) => {
    res.render('public/login');
});

router.get('/register', (req, res) => {
    res.render('public/register', { title: 'Register' });
});


router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const {sessionID} = req
    console.log(sessionID)
    req.session.authenticated = true;
    req.session.username = username;
    // res.redirect("/lobby")
    res.redirect("/lobby");
    // res.render('index', { name: "Jon" });
});


router.post('/register', (req, res) => {
    const {username, password, email} = req.body;
    const hashedpassword = password
    console.log(hashedpassword)
    Users.register({username, hashedpassword, email})
        .then(({id, username}) => {
            req.session.authenticated = true;
            req.session.userID = id;
            req.session.username = username;
            res.redirect("/lobby");
        })
        .catch(error => {
            console.log({ error });
            res.redirect("/auth/register");
        });  
});


// router.post('/register', async (req, res) => {
//     User.register({username, password})
    
//     .catch((error) => {
//         console.log({error})
//     })
//   });
  
//   router.post('/register', async (req, res) => {

//     const hashed_password = await bcrypt.hash(req.body.password, saltRounds)
//     const username = req.body.username
//     const email = req.body.email
//     console.log(username, hashed_password)
//     // Check if username already exists
//     db.any('SELECT username from users where username = $1', [username])
//       .then(results => {
//         if (results.length == 0) {
//           console.log("user doesn't exist")
//           db.any('INSERT INTO users (username, hashedpassword, email) VALUES ($1, $2, $3)',[username, hashed_password, email]).then(_ => db.any('SELECT * FROM users'))
//           .then(res.redirect('/auth/login'))
//         }
//         else {
//           console.log("username already exists")
//           res.redirect('/register');
//         }
//       }
//       )
  
//   });

module.exports = router;