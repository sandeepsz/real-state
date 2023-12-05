import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

export const verifyToken = (req, res, next) => {
  const userToken = req.cookies.access_token;

  if (!userToken) return next(errorHandler(401, "Unauthorized user"));

  jwt.verify(userToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return next("Invalid User ");
    req.user = user;
    next();
  });
};
