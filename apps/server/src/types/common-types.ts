import type { Request, Response } from "express";
import { UserSessionType } from "../zod-schema/user.schema";

export type GenericCustomRequestBody<T> = {
  data: T;
  user: UserSessionType;
};

export interface RequestType<TBody>
  extends Request<{}, {}, GenericCustomRequestBody<TBody>> {}
export interface ResponseType extends Response {}
