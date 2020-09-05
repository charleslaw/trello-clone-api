const path = require("path");
const express = require("express");
const UsersService = require("./users-service");

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.post("/", jsonBodyParser, (req, res, next) => {
  const { email_address, password } = req.body;
  const newUser = { email_address, password };
  for (const [key, value] of Object.entries(newUser)) {
    if (value == null) {
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` },
      });
    }
    const passwordError = UsersService.validatePassword(password);
    if (passwordError)
      return res.status(400).json({ error: passwordError });
  }

  UsersService.containsUserWithEmailAddress(
    req.app.get("db"),
    email_address
  ).then((emailAddress) => {
    if (emailAddress)
      return res.status(400).json({ error: "Username already exists" });

    return UsersService.hashPassword(password).then((hashedPassword) => {
      const newUser = {
        email_address,
        password: hashedPassword,
        date_created: "now()",
      };

      return UsersService.insertUser(req.app.get("db"), newUser).then(
        (user) => {
          res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${user.id}`))
            .json(UserService.serializeUser(user));
        }
      );
    });
  });
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
