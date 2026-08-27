const jwt = require("jsonwebtoken");

const ensureAuthentication = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).json({
      message: "Unauthorized,JWT token is require !",
      success: false,
    });
  }
  try {
    const decode = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decode;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Unauthorized,JWT token is wrong or expired  !",
      success: false,
    });
  }
};

module.exports = ensureAuthentication;
