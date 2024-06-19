import { z } from "zod";

export const taskSchema = z.object({
  title: z.string({
    required_error: "Nombre es requerido",
  }),
  phone: z.string({
    required_error: "Telefono es requerido",
  }),
  adress: z.string({
    required_error: "Adress es requerido",
  }),
  description: z.string({
    required_error: "Descripcion es requerida",
  }),
});
