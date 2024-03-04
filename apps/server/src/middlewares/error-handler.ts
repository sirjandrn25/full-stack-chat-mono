import { Request, Response } from "express";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: Function
) => {
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).send({
    status: error.statusCode,
    message: error.message,
  });
};

export const asyncErrorHandler = (func: Function) => {
  return (req: Request, res: Response, next: Function) =>
    func(req, res, next).catch((error: any) => {
      // if (!error?.code)
      //   return res?.status(500).send({ message: "Internal Server Error" });
      if (error?.code === "P2002") {
        const target = error?.meta?.target[0];

        return res.status(400).send({
          [target]: "unique constraint failed !!",
        });
      }

      next(error);
    });
};
export default errorHandler;
