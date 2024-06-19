import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
  searchTasks,
} from "../controllers/tasks.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/client", auth, getTasks);
router.post("/client", auth, validateSchema(createTaskSchema), createTask);
router.get("/client/:id", auth, getTask);
router.put("/client/:id", auth, updateTask);
router.delete("/client/:id", auth, deleteTask);
router.get("/client/search", auth, searchTasks);

export default router;
