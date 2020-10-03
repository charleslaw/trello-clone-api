const express = require("express");
const listsService = require("./lists-service");
const { requiresAuthorization } = require("../middleware/jwt-auth");

const listsRouter = express.Router();
const jsonBodyParser = express.json();

listsRouter
  .route("/")
  .post(requiresAuthorization, jsonBodyParser, (req, res, next) => {
    const { listTitle } = req.body;
    const newList = { title: listTitle };

    if (listTitle == null)
      return res
        .status(400)
        .json({ error: `Missing title in request body` });

    newList.user_id = req.user.id;
    newList.board_id = req.originalUrl.substring(25);

    listsService
      .postList(req.app.get("db"), newList)
      .then((list) => {
        res.status(201).json(listsService.serializeList(list));
      })
      .catch((error) => console.log(error))
      .catch(next);
  });

// listsRouter
//   .route("/")
//   .all(requiresAuthorization)
//   .get((req, res, next) => {
//     listsService
//       .getAllBoardLists(req.app.get("db"), req.user.id)
//       .then((boards) => {
//         res.json(boards.map(boardsService.serializeBoard));
//       })
//       .catch((error) => console.log(error));
//   });

module.exports = listsRouter;
