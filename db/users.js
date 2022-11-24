const db = require("./index")
const bcrypt = require("bcrypt");
const LOOKUP_USER_BY_USERNAME = "SELECT id from users where username = ${username}";
const REGISTER_USER = "INSERT INTO users (username, password, email) VALUES (${username}, ${password}, ${email}) RETURNING id, username";
const LOGIN_USER = "SELECT id, username, password FROM users WHERE username=${username}";



const register = ({username, password, email}) => {
   return db
   .none(LOOKUP_USER_BY_USERNAME, {username})
   .then(() => bcrypt.hash(password, 10))
   .then((hash) => db.one(REGISTER_USER, {username, password: hash, email}));
};



const login = ({ username, password }) => {
   return db
     .one(LOGIN_USER, { username, password })
     .then(({ id, username, password: encryptedPassword }) =>
       Promise.all([
         bcrypt.compare(password, encryptedPassword),
         { id, username },
       ])
     )
     .then(([result, { id, username }]) => {
       if (result) {
         return { id, username };
       } else {
         return Promise.reject("Please enter a valid username and password.");
       }
     });
 };
 

// const login = ({ username, password }) => {
//    return db
//      .one(LOGIN_USER, { username })
//      .then(({ id, username, password: encryptedPassword }) =>
//       console.log("password")
//       //  Promise.all([
//       //    bcrypt.compare(password, encryptedPassword),
//       //    { id, username },
//       //  ])
//      )
//      .then(([result, { id, username }]) => {
//        if (result) {
//          return { id, username };
//        } else {
//          return Promise.reject("Please enter a valid username and password.");
//        }
//      });
//  };


module.exports = {register, login}