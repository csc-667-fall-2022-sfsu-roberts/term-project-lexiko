const db = require("./index")

const LOOKUP_USER_BY_USERNAME = "SELECT id from users where username = ${username}";
const REGISTER_USER = "INSERT INTO users (username, hashedpassword, email) VALUES (${username}, ${hashedpassword}, ${email}) RETURNING id, username";

const register = ({username, hashedpassword, email}) => {
   return db.none(LOOKUP_USER_BY_USERNAME, {username})
   .then(() => db.one(REGISTER_USER, {username, hashedpassword, email}));
};

module.exports = {register}