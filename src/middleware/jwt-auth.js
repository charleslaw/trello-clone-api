const authService = require("../auth/auth-service");

function requiresAuthorization(req, res, next) {
  const authToken = req.get("Authorization") || "";

  let bearerToken;
  if (!authToken.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Missing bearer token" });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }

  try {
    const payload = authService.verifyJwt(bearerToken);

    authService
      .confirmUserNameExists(req.app.get("db"), payload.sub)
      .then((user) => {
        if (!user) {
          console.log("user does not exist");
          return res.status(401).json({ error: "Unauthorized request" });
        }
        req.user = user;
        next();
      })
      .catch((err) => {
        // return res.status(401).json({ err: "Unauthorized request" });
        console.error(err);
        next(err);
      });
  } catch (error) {
    console.log(error, "this is the error");
    res.status(401).json({ error: "Unauthorized request" });
  }
}

module.exports = { requiresAuthorization };
