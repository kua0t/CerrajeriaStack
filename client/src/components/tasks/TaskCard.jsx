import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink } from "../ui";
import { CardContent } from "../ui/CardContent.jsx";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <CardContent>
      <header className="flex justify-between mb-1 items-center">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteTask(task._id)}>
            <img className="w-8" src={deleteIcon} alt="" />
          </Button>
          <ButtonLink to={`/client/${task._id}`}>
            <img className="w-8" src={editIcon} alt="" />
          </ButtonLink>
        </div>
      </header>
      <div className="flex justify-between">
        <p className="text-slate-200 font-bold">{task.adress}</p>
        <p className="text-slate-200 font-bold">{task.phone}</p>
      </div>
      <p className="text-slate-300">{task.description}</p>
      <p className="mt-4 text-right">
        {task.date &&
          new Date(task.date).toLocaleString("es", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </CardContent>
  );
}
