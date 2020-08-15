const path = require("path");
const express = require("express");
const xss = require("xss");
const UsersService = require("./users-service");

const usersRouter = express.Router();
const jsonParser = express.json();

const serializeUser = (user) => ({
  id: user.id,
  username: xss(user.username),
  date_created: user.date_created,
});

usersRouter.route("/").post(jsonParser, (req, res, next) => {
  const { username, password } = req.body;
  const newUser = { username };
  for (const [key, value] of Object.entries(newUser)) {
    if (value == null) {
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` },
      });
    }
  }
  newUser.password = password;
  UsersService.insertUser(req.app.get("db"), newUser)
    .then((user) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${user.id}`))
        .json(serializeUser(user));
    })
    .catch(next);
});

module.exports = usersRouter;
