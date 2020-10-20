const express = require("express");
const authService = require("./auth-service");
const { requiresAuthorization } = require("../middleware/jwt-auth");
const cors = require("cors");
const authRouter = express.Router();
const jsonBodyParser = express.json();
const config = require("../config");

const corsOptions = {
  origin: `${config.REQUEST_ORIGIN}`,
  optionsSuccessStatus: 200,
};

authRouter.post(
  "/login",
  cors(corsOptions),
  jsonBodyParser,
  (req, res, next) => {
    const { email, password } = req.body;
    const userLoggingIn = { email, password };

    for (const [key, value] of Object.entries(userLoggingIn))
      if (value == null)
        return res
          .status(400)
          .json({ error: `Missing '${key}' in request body` });
    authService
      .confirmUserNameExists(req.app.get("db"), userLoggingIn.email)
      .then((userInDb) => {
        if (!userInDb)
          return res
            .status(400)
            .json({ error: "Incorrect email or password" });

        return authService
          .comparePasswords(userLoggingIn.password, userInDb.password)
          .then((matchedPw) => {
            if (!matchedPw)
              return res
                .status(400)
                .json({ error: "Incorrect email or password" });

            const subject = userInDb.email;
            const payload = { userId: userInDb.id };
            res.send({
              authToken: authService.createJwt(subject, payload),
            });
          })

          .catch(next);
      });
  }
);

authRouter.post("/refresh", requiresAuthorization, (req, res) => {
  const subject = req.user.email;
  const payload = { userId: req.user.id };
  res.send({
    authToken: authService.createJwt(subject, payload),
  });
});

module.exports = authRouter;
