import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);
dayjs.locale("es");

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      // navigate("/tasks");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("phone", task.phone);
        setValue("adress", task.adress);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Nombre</Label>
        <Input
          type="text"
          name="title"
          placeholder="nombre"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">
            Porfavor ingrese un nombre.
          </p>
        )}

        <Label htmlFor="phone">Telefono</Label>
        <Input
          type="text"
          name="phone"
          placeholder="telefono"
          {...register("phone")}
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">
            Porfavor ingrese un telefono.
          </p>
        )}

        <Label htmlFor="adress">Direccion</Label>
        <Input
          type="text"
          name="adress"
          placeholder="direccion"
          {...register("adress")}
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">
            Porfavor ingrese una direccion.
          </p>
        )}

        <Label htmlFor="description">Trabajo realizado</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Trabajo realizado"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="date">Fecha</Label>
        <Input type="date" name="date" {...register("date")} />
        <Button>Save</Button>
      </form>
    </Card>
  );
}
