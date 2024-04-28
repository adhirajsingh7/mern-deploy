exports.is_admin_authorization = (req, res, next) => {
  if (req.user.role === "admin") return next();
  else return res.status(403).json({ message: "Authorization required" });
};

exports.is_merchant_authorization = (req, res, next) => {
  if (req.user.role === "merchant") return next();
  else return res.status(403).json({ message: "Authorization required" });
};

exports.is_authenticated = (req, res, next) => {
  if (req.user) return next();
  else return res.status(401).json({ message: "Authentication required" });
};
