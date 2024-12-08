import { useEffect, useState } from "react";
import "./App.css";

import AddTask from "./components/addtask";
import Header from "./components/header";
import ShowTask from "./components/showtask";
import useLocalStorage from "./components/useLocalStorage";

interface TaskFormat {
  id: number;
  name: string;
  time: string;
}

function App() {
  const [storedTasks, setStoredTasks] = useLocalStorage<TaskFormat[]>(
    "taskList",
    []
  );
  const [taskList, setTaskList] = useState<TaskFormat[]>(storedTasks);
  const [task, setTask] = useState<TaskFormat | null>(null);
  const [searchedlist, setSearchedlist] = useState<TaskFormat[] | null>(null);

  useEffect(() => {
    setStoredTasks(taskList);
  }, [setTaskList, setStoredTasks, taskList]);

  return (
    <div className="App">
      <Header storedValue={storedTasks} setSearchedList={setSearchedlist} />
      <AddTask
        taskList={taskList}
        setTaskList={setTaskList}
        task={task}
        setTask={setTask}
      />
      <ShowTask
        taskList={taskList}
        searchedTaskList={searchedlist}
        setSearchedList={setSearchedlist}
        setTaskList={setTaskList}
        task={task}
        setTask={setTask}
      />
    </div>
  );
}

export default App;
