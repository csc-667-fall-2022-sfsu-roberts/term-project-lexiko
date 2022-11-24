const express = require("express");

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.render("protected/game", { id });
});

router.get("/:id/:message", (req, res) => {
  const { id, message } = req.params;

  res.render("protected/game", { id, message });
});

module.exports = router;