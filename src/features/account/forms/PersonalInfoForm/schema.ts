import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be no more than 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z.string().email("Invalid email address"),
});

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
