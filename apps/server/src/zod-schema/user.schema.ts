import { z } from "zod";
import { UserRoles } from "../models/user.model";

export const MobileNumberRegex = /^\d{10}$/;
export const UserBaseSchema = z.object({
  _id: z.string(),
  email_verified: z.boolean(),
  role: z.enum(UserRoles as any),
  avatar_url: z.string().nullish(),
  name: z.string({
    required_error: "name is required",
  }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, "password too short - should be 6 chars minimum"),
  email: z
    .string({
      required_error: "email is required",
    })
    .email("not a valid email"),
  mobile: z.string().regex(MobileNumberRegex),

  is_active: z.boolean(),
  created_at: z.date(),

  address: z.object({
    state: z.string(),
    city: z.string(),
    address: z.string(),
    postal_code: z.string().optional(),
  }),
});

export const UserLoginSchema = UserBaseSchema.pick({
  email: true,
  password: true,
});
export const RefreshTokenSchema = z.object({
  token: z.string(),
});

export const UserUpdateSchema = UserBaseSchema.pick({
  name: true,
  image: true,
  is_active: true,
  address: true,
});
export type UserUpdateSchemaType = z.infer<typeof UserUpdateSchema>;
export type RefreshTokenSchemaType = z.infer<typeof RefreshTokenSchema>;
export type LoginSchemaType = z.infer<typeof UserLoginSchema>;
export const UserRegisterSchema = UserBaseSchema.pick({
  email: true,
  password: true,
  name: true,
});
export const PasswordChangeSchema = z.object({
  old_password: z.string().min(6),
  password: z.string().min(6),
});
export type PasswordChangeSchemaType = z.infer<typeof PasswordChangeSchema>;
export type UserRegisterSchemaType = z.infer<typeof UserRegisterSchema>;
export const UserSessionSchema = UserBaseSchema.omit({
  password: true,
  address: true,
  created_at: true,
});
export type UserSessionType = z.infer<typeof UserSessionSchema>;
/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
