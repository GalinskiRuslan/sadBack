const jwt = require("jsonwebtoken");
module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method == "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "У вас нет доступа" });
      }
      const role = jwt.verify(token, "secretASS").user.user_role;
      if (roles.includes(role)) {
        return next();
      } else {
        return res.status(401).json({ message: "У вас нет доступа" });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "У вас нет доступа" });
    }
  };
};
