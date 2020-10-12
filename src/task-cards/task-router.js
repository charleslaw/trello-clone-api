const express = require("express");
const tasksService = require("./task-service");
const { requiresAuthorization } = require("../middleware/jwt-auth");

const tasksRouter = express.Router();
const jsonBodyParser = express.json();

tasksRouter
  .route("/")
  .post(requiresAuthorization, jsonBodyParser, (req, res, next) => {
    const { title: title, list_id: listId } = req.body;
    const task = { title: title, list_id: listId };

    if (task.title.length == 0)
      return res
        .status(400)
        .json({ error: `Missing title in request body` });

    task.user_id = req.user.id;

    tasksService
      .postTask(req.app.get("db"), task)
      .then((task) => {
        res.status(201).json(tasksService.serializeTask(task));
      })
      // .catch((error) => console.log(error))
      .catch(next);
  });
tasksRouter
  .route("/")
  .all(requiresAuthorization)
  .get((req, res, next) => {
    const listId = req.query.listid;
    tasksService
      .getTasksByListId(req.app.get("db"), listId)
      .then((tasks) => {
        res.json(tasks.map(tasksService.serializeTask));
      })
      .catch((error) => console.log(error));
  });

module.exports = tasksRouter;
