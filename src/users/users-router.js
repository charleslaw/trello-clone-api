const express = require("express");
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

// Create new user with email and password-handles post request to users endpoint
usersRouter.post(
  "/",
  cors(corsOptions),
  jsonBodyParser,
  (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
    for (const field of ["email", "password", "confirmPassword"])
      if (!req.body[field])
        return res
          .status(400)
          .json({ error: `Missing '${field}' in request body` });

    const passwordError = UsersService.validatePassword(
      password,
      confirmPassword
    );
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
                .json(UsersService.serializeUser(user));
            });
          }
        );
      })

      .catch((error) => console.log(error));
  }
);

module.exports = usersRouter;
