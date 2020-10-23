const express = require("express");
const boardsService = require("./boards-service");
const { requiresAuthorization } = require("../middleware/jwt-auth");

const boardsRouter = express.Router();
const jsonBodyParser = express.json();

boardsRouter
  .route("/")
  .post(requiresAuthorization, jsonBodyParser, async (req, res, next) => {
    const { title } = req.body;
    const newBoard = { title };

    if (title == null)
      return res
        .status(400)
        .json({ error: `Missing title in request body` });

    newBoard.user_id = req.user.id;

    try {
      const board = await boardsService.postBoard(
        req.app.get("db"),
        newBoard
      );
      return res.status(201).json(boardsService.serializeBoard(board));
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

boardsRouter
  .route("/")
  .all(requiresAuthorization)
  .get(async (req, res, next) => {
    try {
      const boards = await boardsService.getAllUserBoards(
        req.app.get("db"),
        req.user.id
      );
      return res.json(boards.map(boardsService.serializeBoard));
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

boardsRouter.route("/delete").delete(async (req, res, next) => {
  const boardId = req.query.id;

  try {
    const numRowsAffected = await boardsService.deleteBoard(
      req.app.get("db"),
      boardId
    );

    console.log(numRowsAffected);
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = boardsRouter;
