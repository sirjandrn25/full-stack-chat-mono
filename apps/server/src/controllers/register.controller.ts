import { asyncErrorHandler } from "../middlewares/error-handler";
import UserModel from "../models/user.model";
import { RequestType, ResponseType } from "../types/common-types";
import { HashPassword } from "../utils/hash.utils";
import { UserRegisterSchemaType } from "../zod-schema/user.schema";

export const registerController = asyncErrorHandler(
  async (req: RequestType<UserRegisterSchemaType>, res: ResponseType) => {
    const { email, name, password } = req.body.data;
    const user = await UserModel.findOne({
      email,
    });
    if (user) return res.status(400).send("this email is already registered");
    const hashedPassword = await HashPassword(password);
    const newUser = await UserModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return res.status(200).send(newUser);
  }
);
