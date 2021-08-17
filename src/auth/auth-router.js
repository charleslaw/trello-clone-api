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
      const token = authService.createJwt(subject, payload);
      // Storing it secure true is highly recommended for production
      // servers that support HTTPS
      res.cookie(
        'jwt', token, { httpOnly: true, maxAge: 3600000 },
      ).send({
        authToken: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "error logging in" });
      next(error);
    }
  }
);

// handle post request to refresh end point-create new jwt and send to client
authRouter.post("/refresh", requiresAuthorization, (req, res) => {
  const subject = req.user.email;
  const payload = { userId: req.user.id };
  const token = authService.createJwt(subject, payload);
  // Storing it secure true is highly recommended for production
  // servers that support HTTPS
  res.cookie(
    'jwt', token, { httpOnly: true, maxAge: 3600000 },
  ).send({
    authToken: token,
  });
});

// Get all boards-handle get request to boards end point
authRouter.get("/whoami", requiresAuthorization, (req, res) => {
  try {
    return res.send({
      email: req.user.email
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "error reading user for cookie" });
  }
});

// Get all boards-handle get request to boards end point
authRouter.post("/logout", requiresAuthorization, (req, res) => {
  try {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(1),
    }).sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(200);
  }
});


module.exports = authRouter;
