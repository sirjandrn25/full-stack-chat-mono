import type { Response, Request, NextFunction } from "express";
const jwt = require("jsonwebtoken");

export interface UserRequestType extends Request {
  user?: any;
}
export const verifyUser = (
  req: UserRequestType,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: any, decoded: any) => {
      if (err) return res.sendStatus(401);

      req.body.user = decoded;
      next();
    }
  );
};
