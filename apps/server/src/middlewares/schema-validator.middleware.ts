import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const schemaValidator = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await schema.parseAsync(req.body);
      req.body.data = data;
      next();
    } catch (error: any) {
      console.log("error", error);
      return res.status(400).json(formattingError(error.format()));
    }
  };
};

const formattingError = (err: any) => {
  let newError: any = {};
  for (let [key, value] of Object.entries(err)) {
    newError[key] = (value as any)._errors;
  }
  return newError;
};

export default schemaValidator;
