import type { Response } from "express";
import { asyncErrorHandler } from "../middlewares/error-handler";
import UserModel from "../models/user.model";
import { RequestType, ResponseType } from "../types/common-types";
import { ComparePasswordWithHash, HashPassword } from "../utils/hash.utils";
import {
  PasswordChangeSchemaType,
  RefreshTokenSchemaType,
} from "../zod-schema/user.schema";
import { verifyRefreshToken } from "../utils/token.utils";

export const getLoggedUserController = asyncErrorHandler(
  async (req: RequestType<{}>, res: Response) => {
    const user = req.body.user;
    // console.log("user", user);
    const userDb = await UserModel.findById(user._id);
    return res.send(userDb);
  }
);

export const passwordChangeController = asyncErrorHandler(
  async (req: RequestType<PasswordChangeSchemaType>, res: ResponseType) => {
    const { password, old_password } = req.body.data;
    const user = req.body.user;
    const userDb = await UserModel.findById(user._id);
    const isMatched = await ComparePasswordWithHash(
      old_password,
      userDb.password
    );
    if (!isMatched) return res.status(403).send("Old password doesn't matched");
    const hashedPassword = await HashPassword(password);
    await UserModel.updateOne({ _id: user._id }, { password: hashedPassword });
    return res.status(200).send("Successfully Changed");
  }
);

export const refreshTokenController = asyncErrorHandler(
  async (req: RequestType<RefreshTokenSchemaType>, res: ResponseType) => {
    const { token } = req.body.data;
    try {
      const result = await verifyRefreshToken(token);
      return res.status(200).send(result);
    } catch (err) {
      return res.status(403).send({ message: "Error verifying refresh token" });
    }
  }
);
