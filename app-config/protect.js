const { response } = require("../app");

const protect = (req, res, next) => {
    if (req.session.authenticated){
        next();
    } else {
        response.redirect("/login");
    }
}


module.exports = protect