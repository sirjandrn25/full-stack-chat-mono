import { Router } from "express";
import { loginController } from "./controllers/login.controller";
import { registerController } from "./controllers/register.controller";
import schemaValidator from "./middlewares/schema-validator.middleware";
import {
  PasswordChangeSchema,
  RefreshTokenSchema,
  UserLoginSchema,
  UserRegisterSchema,
} from "./zod-schema/user.schema";
import { verifyUser } from "./middlewares/verify-user.middleware";
import {
  getLoggedUserController,
  passwordChangeController,
  refreshTokenController,
} from "./controllers/auth.controller";

const router = Router();
router.post(
  "/auth/register",
  schemaValidator(UserRegisterSchema),
  registerController
);
router.get("/auth", verifyUser, getLoggedUserController);
router.post(
  "/auth/password",
  schemaValidator(PasswordChangeSchema),
  verifyUser,
  passwordChangeController
);
router.post("/auth/login", schemaValidator(UserLoginSchema), loginController);
router.post(
  "/auth/refresh-token",
  schemaValidator(RefreshTokenSchema),
  refreshTokenController
);
export default router;
