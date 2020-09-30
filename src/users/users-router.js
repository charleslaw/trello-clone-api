const express = require("express");
const path = require("path");
const UsersService = require("./users-service");
const authService = require("../auth/auth-service");
const cors = require("cors");
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const config = require("../config");

const corsOptions = {
  origin: `${config.REQUEST_ORIGIN}`,
  optionsSuccessStatus: 200,
};

usersRouter.post(
  "/",
  cors(corsOptions),
  jsonBodyParser,
  (req, res, next) => {
    const { email, password } = req.body;
    for (const field of ["email", "password"])
      if (!req.body[field])
        return res
          .status(400)
          .json({ error: `Missing '${field}' in request body` });

    const passwordError = UsersService.validatePassword(password);
    if (passwordError)
      return res.status(400).json({ error: passwordError });

    UsersService.containsUserWithEmailAddress(req.app.get("db"), email)
      .then((hasEmailAddress) => {
        if (hasEmailAddress)
          return res.status(400).json({ error: "Email already taken" });

        return UsersService.hashPassword(password).then(
          (hashedPassword) => {
            const newUser = {
              email,
              password: hashedPassword,
              date_created: "now()",
            };

            return UsersService.insertUser(
              req.app.get("db"),
              newUser
            ).then((user) => {
              const subject = user.email;
              const payload = { userId: user.id };
              res.send({
                authToken: authService.createJwt(subject, payload),
              });
              return res
                .status(201)

                .location(path.posix.join(req.originalUrl, `/${user.id}`))
                .json(UsersService.serializeUser(user));
            });
          }
        );
      })

      .catch((error) => console.log(error));
  }
);

module.exports = usersRouter;
