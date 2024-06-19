import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Name is required",
  }),
  phone: z.string({
    required_error: "Phone is required",
  }),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
});
