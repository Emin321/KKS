const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      error: "Nema tokena"
    });
  }

  // format: Bearer TOKEN
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "tajni_kljuc");

    // ubacujemo usera u request
    req.user = decoded;

    next(); // pusti dalje
  } catch (err) {
    return res.status(403).json({
      error: "Nevalidan token"
    });
  }
}

module.exports = authMiddleware;