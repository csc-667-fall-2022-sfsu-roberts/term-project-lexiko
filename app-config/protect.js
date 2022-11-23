const { response } = require("../app");

const protect = (req, res, next) => {
    if (req.session.authenticated){
        next();
    } else {
        res.redirect("/auth/login");
    }
};


module.exports = protect