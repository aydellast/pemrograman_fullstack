function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized. Silakan login terlebih dahulu.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden. Kamu tidak memiliki akses ke halaman ini.",
      });
    }

    next();
  };
}

module.exports = authorize;