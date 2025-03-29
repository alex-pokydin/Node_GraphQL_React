import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  isAuth?: boolean;
  userId?: string;
}

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken: authPayload;

  try {
    decodedToken = jwt.verify(token, "somesupersecretkey") as authPayload;
  } catch (err) {
    console.log(err);
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
