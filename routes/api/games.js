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

router.post("/:id/join", (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;

    Games.addUser(userId, id)
    .then(() => {
        res.redirect(`/game/${id}`);
    }).catch((error) => {
        console.log({ error });
    });
});

router.post("/:id/play", (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;

    // check that the user is in the game
        // if not, ignore

    // check that its the user's turn
        // if not, ignore

    // check the card (tile?) that is being played is held by the user
        // if not, broadcast and error to user

    // check the card (tile)? that is being played is a valid play
        // if not, broadcast an error to user

    // if all of that is true, update game state and broadcast
        // remove the card (tile)? from user's hand
        // add card (tile)? to discard pile
        // change current user
        // broadcast game state

});

module.exports = router;