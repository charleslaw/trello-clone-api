const authService = require("../auth/auth-service");

const requiresAuthorization = async (req, res, next) => {
  const authToken = req.cookies.jwt || "";

  try {
    const payload = authService.verifyJwt(authToken);

    const user = await authService.confirmUserNameExists(
      req.app.get("db"),
      payload.sub
    );
    if (!user) {
      console.log("user does not exist");
      return res.status(401).json({ error: "Unauthorized request" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error, "this is the error");
    res.status(401).json({ error: "Unauthorized request" });
  }
};

module.exports = { requiresAuthorization };
