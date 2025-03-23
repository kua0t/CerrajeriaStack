import axios from "./axios";

export const getTasksRequest = async () => axios.get("/client");

export const createTaskRequest = async (task) => axios.post("/client", task);

export const updateTaskRequest = async (task) =>
  axios.put(`/client/${task._id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/client/${id}`);

export const getTaskRequest = async (id) => axios.get(`/client/${id}`);
