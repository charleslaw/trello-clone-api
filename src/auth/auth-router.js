const express = require("express");
const authService = require("./auth-service");
const { requiresAuthorization } = require("../middleware/jwt-auth");
const cors = require("cors");
const authRouter = express.Router();
const jsonBodyParser = express.json();
const config = require("../config");

// const corsOptions = {
//   origin: `${config.REQUEST_ORIGIN}`,
//   optionsSuccessStatus: 200,
// };

// handle post request to login end point (user logging in)
authRouter.post(
  "/login",
  cors(corsOptions),
  jsonBodyParser,
  async (req, res, next) => {
    const { email, password } = req.body;
    const userLoggingIn = { email, password };

    for (const [key, value] of Object.entries(userLoggingIn))
      if (value == null)
        return res
          .status(400)
          .json({ error: `Missing '${key}' in request body` });
    try {
      const userInDb = await authService.confirmUserNameExists(
        req.app.get("db"),
        userLoggingIn.email
      );
      if (!userInDb)
        return res
          .status(400)
          .json({ error: "Incorrect email or password" });

      const matchedPw = await authService.comparePasswords(
        userLoggingIn.password,
        userInDb.password
      );
      if (!matchedPw)
        return res
          .status(400)
          .json({ error: "Incorrect email or password" });

      const subject = userInDb.email;
      const payload = { userId: userInDb.id };
      res.send({
        authToken: authService.createJwt(subject, payload),
      });
    } catch (error) {
      next(error);
      return res.status(400).json({ error: "error logging in" });
    }
  }
);

// handle post request to refresh end point-create new jwt and send to client
authRouter.post("/refresh", requiresAuthorization, (req, res) => {
  const subject = req.user.email;
  const payload = { userId: req.user.id };
  res.send({
    authToken: authService.createJwt(subject, payload),
  });
});

module.exports = authRouter;
