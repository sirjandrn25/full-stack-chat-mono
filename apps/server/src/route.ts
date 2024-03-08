import { Router } from "express";
import { loginController } from "./controllers/login.controller";
import { registerController } from "./controllers/register.controller";
import schemaValidator from "./middlewares/schema-validator.middleware";
import { UserLoginSchema, UserRegisterSchema } from "./zod-schema/user.schema";

const router = Router();
router.post(
  "/auth/register",
  schemaValidator(UserRegisterSchema),
  registerController
);
router.post("/auth/login", schemaValidator(UserLoginSchema), loginController);

export default router;
