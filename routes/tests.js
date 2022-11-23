const express = require("express");
var crypto = require('crypto');
const router = express.Router();
const db = require('../db');
const { QueryTypes } = require("sequelize");

// 'users',
//       {
//         id: {
//           type: Sequelize.INTEGER,
//           primaryKey: true,
//           autoIncrement: true
//         },
//         username: {
//           type: Sequelize.STRING(12),
//           unique: true,
//           allowNull: false
//         },
//         hashedpassword: {
//           type: Sequelize.BLOB,
//           allowNull: false,
//         },
//         salt: {
//           type: Sequelize.BLOB,
//           allowNull: false
//         },
//         email: {
//           type: Sequelize.STRING(254),
//           allowNull: false
//         }
//       }
router.get("/", (request, response) => {
 
        db.any('SELECT * FROM users')
        .then(results => response.json(results))
        .catch(error => {
            console.log(error)
            response.json({ error })
        })
    // db.any('INSERT INTO users (username, hashedpassword, salt, email) VALUES ($1, $2, $3, $4)',[testuser, testpassword, salt, testemail]).then(_ => db.any('SELECT * FROM user'))
    //     .then(results => response.json(results))
    //     .catch(error => {
    //         console.log(error)
    //         response.json({ error })
    //     })
});



// router.get("/", (request, response) => {
//     db.any('INSERT INTO  ("testString") VALUES ('Hello at $
//          {Date.now()}')')
//         .then(_ => db.any('SELECT * FROM table'))
//         .then(results => response.json(results))
//         .catch(error => {
//             console.log(error)
//             response.json({ error })
//         })
// });


// router.get("/", (request, response) => {
//     db.any('SELECT * FROM users')
//         .then(results => response.json(results))
//         .catch(error => {
//             console.log(error)
//             response.json({ error })
//         })
// });
module.exports = router;