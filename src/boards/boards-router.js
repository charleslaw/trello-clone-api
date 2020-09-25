const express = require("express");
const path = require("path");
const boardsService = require("./boards-service");
const { requiresAuthorization } = require("../middleware/jwt-auth");

const boardsRouter = express.Router();
const jsonBodyParser = express.json();

boardsRouter
  .route("/")
  .post(requiresAuthorization, jsonBodyParser, (req, res, next) => {
    const { title } = req.body;
    const newBoard = { title };

    if (title == null)
      return res
        .status(400)
        .json({ error: `Missing title in request body` });

    newBoard.user_id = req.user.id;

    boardsService
      .postBoard(req.app.get("db"), newBoard)
      .then((board) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${board.id}`))
          .json(boardsService.serializeBoard(board));
      })
      .catch(next);
  });

module.exports = boardsRouter;
