const express = require("express");
const Users = require("../db/users");

const router = express.Router();


router.get('/login', (req, res) => {
    res.render('public/login');

});

router.get('/register', (req, res) => {
    res.render('public/register', { title: 'Register' });
});

const handleLogin =
  (req, res) =>
  ({ id, username }) => {
    req.session.authenticated = true;
    req.session.userId = id;
    req.session.username = username;

    console.log(req.session);
    res.redirect("/lobby");
  };

const handleLoginError = (res, redirectUri) => 
    (error) => {
        console.log({ error });
        res.redirect(redirectUri);
    };



router.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    Users.login({ username, password })
      .then(handleLogin(req, res))
      .catch(handleLoginError(res, "/auth/login"));
  });


router.post('/register', (req, res) => {
    const {username, password, email} = req.body;
    Users.register({username, password, email})
        .then(handleLogin(req,res))
        .catch(handleLoginError(res, "/auth/register"))
});


module.exports = router;