import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, phone, adress, description, date } = req.body;
    const newTask = new Task({
      title,
      phone,
      adress,
      description,
      date,
      user: req.user.id,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, phone, adress, description, date } = req.body;
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, phone, adress, description, date },
      { new: true }
    );
    return res.json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchTasks = async (req, res) => {
  try {
    const { q } = req.query;
    let tasks;
    const regex = new RegExp(q, "i");

    // Verifica si la consulta es un nombre de mes
    const monthIndex = new Date(q + " 1, 2000").getMonth();
    if (!isNaN(monthIndex)) {
      // Si es un nombre de mes, busca por el nombre del mes
      tasks = await Task.find({
        user: req.user.id,
        $or: [
          { title: regex },
          { adress: regex },
          { phone: regex },
          { date: regex },
          // Busca por el nombre del mes en el campo "date"
          { date: { $regex: new RegExp(q, "i") } },
        ],
      }).populate("user");
    } else {
      // Si no es un nombre de mes, busca como antes
      tasks = await Task.find({
        user: req.user.id,
        $or: [
          { title: regex },
          { adress: regex },
          { phone: regex },
          { date: regex },
        ],
      }).populate("user");
    }
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
