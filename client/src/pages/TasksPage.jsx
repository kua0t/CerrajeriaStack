import React, { useState, useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleTasksCount, setVisibleTasksCount] = useState(30);

  useEffect(() => {
    getTasks();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLoadMore = () => {
    setVisibleTasksCount(visibleTasksCount + 30);
  };

  // Validamos que tasks sea un array, si no, usamos uno vacío
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const filteredTasks = safeTasks.filter((task) => {
    const { title, adress, phone, date } = task;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      title.toLowerCase().includes(lowerSearchTerm) ||
      adress.toLowerCase().includes(lowerSearchTerm) ||
      phone.toLowerCase().includes(lowerSearchTerm) ||
      date.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const visibleTasks = filteredTasks.slice(0, visibleTasksCount);

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar por Nombre, Teléfono o Fecha"
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 text-black"
      />

      {safeTasks.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No hay clientes, para agregar haga click en el + para agregar
            </h1>
          </div>
        </div>
      )}

      <div className="grid min-[767px]:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {visibleTasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>

      {visibleTasksCount < filteredTasks.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 mb-5 bg-blue-500 text-white rounded-md"
          >
            Cargar más
          </button>
        </div>
      )}
    </>
  );
}
