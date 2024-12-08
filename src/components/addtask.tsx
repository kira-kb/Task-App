import { useEffect, useState } from "react";

interface TaskFormat {
  id: number;
  name: string;
  time: string;
}

interface TaskFormatProbs {
  taskList: TaskFormat[];
  setTaskList: (newTaskList: TaskFormat[]) => void;
  task: TaskFormat | null;
  setTask: (task: TaskFormat | null) => void;
}

// !==================================================================================================================

const AddTask: React.FC<TaskFormatProbs> = ({
  taskList,
  setTaskList,
  task,
  setTask,
}) => {
  const [todo, setTodo] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodo(e.target.value);

  // !==================================================================================================================

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ?======================================== ADD =========================================================

    if (!todo.trim()) return alert("please add a task name and try again");
    const date = new Date();
    const newTask: TaskFormat = {
      id: date.getTime(),
      name: todo,
      time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
    };

    // ?==================================== EDIT =============================================================

    if (task?.name) {
      taskList.map((todoTask) => {
        if (todoTask.id === task.id) {
          todoTask.name = newTask.name;
          todoTask.time = `Edited on ${newTask.time}`;
        }
      });

      // setTaskList([...taskList]);
      // setTask(null);
      // setTodo("");
      // return;
    } else taskList.push(newTask);

    setTaskList([...taskList]);
    // setTaskList([...taskList, newTask]);
    setTodo("");
    setTask(null);
  };

  // !==================================================================================================================

  useEffect(() => {
    if (task) setTodo(task.name);
  }, [task]);

  // !==================================================================================================================

  return (
    <section className="addTask">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          autoComplete="off"
          placeholder="add task"
          onChange={handleInput}
          value={todo}
        />
        <button type="submit">{task?.name && todo ? "update" : "Add"}</button>
      </form>
    </section>
  );
};

export default AddTask;
