interface TaskFormat {
  id: number;
  name: string;
  time: string;
}

interface TaskFormatProbs {
  taskList: TaskFormat[];
  setTaskList: (newTaskList: TaskFormat[]) => void;
  searchedTaskList: TaskFormat[] | null;
  setSearchedList: (task: TaskFormat[] | null) => void;
  task: TaskFormat | null;
  setTask: (newTaskList: TaskFormat | null) => void;
}

const ShowTask: React.FC<TaskFormatProbs> = ({
  taskList,
  setTaskList,
  searchedTaskList,
  setSearchedList,
  task,
  setTask,
}) => {
  const handleDelete = (id: number) => {
    const updatedList = taskList.filter((todo) => {
      if (todo.id === id && id === task?.id) setTask(null);
      return todo.id !== id;
    });

    const updatedSearchList = searchedTaskList?.filter((todo) => {
      if (todo.id === id && id === task?.id) setTask(null);
      return todo.id !== id;
    });
    setSearchedList(updatedSearchList || null);

    setTaskList(updatedList);
  };

  const handleEdit = (id: number) => {
    const selectedTodo = taskList.find((todo) => todo.id === id);
    if (selectedTodo) setTask(selectedTodo);
  };

  const listingTasks = searchedTaskList ? searchedTaskList : taskList;

  return (
    <section className="showTask">
      <div className="head">
        <div>
          <span className="title">Todo</span>
          <span className="count">{listingTasks.length}</span>
        </div>
        <button onClick={() => setTaskList([])} className="clearAll">
          Clear All
        </button>
      </div>

      <ul>
        {listingTasks.map((singleTask) => (
          <li key={singleTask.id}>
            <p>
              <span className="name">{singleTask.name}</span>
              <span className="time">{singleTask.time}</span>
            </p>
            <i
              onClick={() => handleEdit(singleTask.id)}
              className="bi bi-pencil-square"
            ></i>
            <i
              onClick={() => handleDelete(singleTask.id)}
              className="bi bi-trash"
            ></i>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ShowTask;
