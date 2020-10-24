const express = require("express");
const listsService = require("./lists-service");
const { requiresAuthorization } = require("../middleware/jwt-auth");

const listsRouter = express.Router();
const jsonBodyParser = express.json();

// Create new list-handles post request to lists end point
listsRouter
  .route("/")
  .post(requiresAuthorization, jsonBodyParser, (req, res, next) => {
    const { list_title: listTitle, board_id: boardId } = req.body;
    const newList = { list_title: listTitle, board_id: boardId };

    if (newList.list_title == null)
      return res
        .status(400)
        .json({ error: `Missing title in request body` });

    newList.user_id = req.user.id;

    listsService
      .postList(req.app.get("db"), newList)
      .then((list) => {
        res.status(201).json(listsService.serializeList(list));
      })
      .catch((error) => console.log(error))
      .catch(next);
  });

// Get all lists-handles get request to lists end point
listsRouter
  .route("/")
  .all(requiresAuthorization)
  .get((req, res, next) => {
    const boardId = req.query.id;
    listsService
      .getAllListsByBoardId(req.app.get("db"), boardId)
      .then((lists) => {
        res.json(lists.map(listsService.serializeList));
      })
      .catch((error) => console.log(error));
  });

// Delete list based on list ID-handles delete request to lists end point
listsRouter.route("/delete").delete((req, res, next) => {
  const listId = req.query.id;
  listsService
    .deleteList(req.app.get("db"), listId)
    .then((numRowsAffected) => {
      console.log(numRowsAffected);
      res.status(204).end();
    })
    .catch((error) => console.log(error))

    .catch(next);
});

module.exports = listsRouter;
