const session = require("cookie-session");

const sessionInstance = session({
    secret: "secret",
    cookie: {maxAge: 24 * 60 * 60 * 1000},
    resave: false,
    saveUninitialized: true,
    httpOnly: true
});

module.exports = sessionInstance;