import { asyncErrorHandler } from "../middlewares/error-handler";
import UserModel from "../models/user.model";
import { RequestType } from "../types/common-types";
import { ComparePasswordWithHash } from "../utils/hash.utils";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.utils";
import { LoginSchemaType, UserSessionType } from "../zod-schema/user.schema";
import { ResponseType } from "../types/common-types";

export const loginController = asyncErrorHandler(
  async (req: RequestType<LoginSchemaType>, res: ResponseType) => {
    const { email, password } = req.body.data;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).send("email does not exist!!");
    const isMatchedPassword = await ComparePasswordWithHash(
      password,
      user.password
    );

    if (!isMatchedPassword)
      return res.status(400).send("credentials do not match");
    const userSession: UserSessionType = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      email_verified: user.email_verified,
      is_active: user?.is_active,
      mobile: user.mobile,
    };

    const access_token = await generateAccessToken(userSession);
    const refresh_token = await generateRefreshToken(userSession);

    res.status(200).send({
      user: userSession,
      access_token,
      refresh_token,
    });
  }
);
