import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post('/login', (req, res) => {
  res.send('Recibido');
});
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);

export default router;
