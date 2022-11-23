const session = require("express-session");

const sessionInstance = session({
    secret: "hellor",
    cookie: { maxAge: 24 * 60 * 60 },
    
})