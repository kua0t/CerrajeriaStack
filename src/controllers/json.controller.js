import Task from "../models/task.model.js";

export const addTasksFromJson = async (req, res) => {
  try {
    const jsonData = req.body;

    for (const taskData of jsonData) {
      const newTask = new Task(taskData);
      await newTask.save();
    }

    res.status(201).json({ message: "Tasks added successfully from JSON" });
  } catch (error) {
    console.error("Error adding tasks from JSON:", error);
    res.status(500).json({ message: "Failed to add tasks from JSON" });
  }
};
