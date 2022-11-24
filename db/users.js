const db = require("./index")

const REGISTER_USER = "INSERT INTO users (username, hashedpassword, email) VALUES (${username}, ${hashedpassword}, ${email}) RETURNING id, username"

const register = ({username, hashedpassword, email}) => {
   return db.one(REGISTER_USER, {username, hashedpassword, email});
};

module.exports = {register}