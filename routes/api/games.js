const express = require("express");
const router = express.Router();
const Games = require("../../db/game");

router.post("/create", (request, response) => {
    const { userId } = request.session;
    const { title = "" } = request.body;

    Games.create(userId, title)
    .then(({ game_id }) => {
        response.redirect(`/game/${game_id}`);

        request.app.io.emit("game:created", {
            game_id,
            title,
          });
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = router;