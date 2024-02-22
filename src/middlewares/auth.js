const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ").length === 2
    ) {
      const token = req.headers.authorization.split(" ")[1];
      let decodedData;

      if (token) {
        decodedData = jwt.verify(token, process.env.SECRET_TOKEN);
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
      }
    } else {
      return res.status(500).json({
        success: false,
        message: "Authentication invalid",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
