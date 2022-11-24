const db = require("./index")
const bcrypt = require("bcrypt");
const LOOKUP_USER_BY_USERNAME = "SELECT id from users where username = ${username}";
const REGISTER_USER = "INSERT INTO users (username, password, email) VALUES (${username}, ${password}, ${email}) RETURNING id, username";
const LOGIN_USER = "SELECT id, username FROM users WHERE username=${username} and password=${password}"



const register = ({username, password, email}) => {
   return db
   .none(LOOKUP_USER_BY_USERNAME, {username})
   .then(() => bcrypt.hash(password, 10))
   .then((hash) => db.one(REGISTER_USER, {username, password: hash, email}));
};

const login = ({username, login}) => {
   return db.one(LOGIN_USER, {username, login});
}

module.exports = {register, login}