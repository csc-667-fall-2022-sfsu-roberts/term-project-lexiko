const session = require("cookie-session");

const sessionInstance = session({
    secret: "secret",
    cookie: {maxAge: 24 * 60 * 60},
    resave: false,
    saveUninitialized: true
});

module.exports = sessionInstance;