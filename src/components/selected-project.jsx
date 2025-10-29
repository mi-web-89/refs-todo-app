import Button from "./ui/button";
import Task from "./Task";

export default function SelectedProject({
  project,
  onDeleteProject,
  onAddTask,
  onDeleteTask,
  tasks,
}) {
  // console.log("TASK", tasks);
  const { id, title, dueDate, description } = project;
  const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  
  let tasksList = tasks.filter((task) => task.projectId === id);

  return (
    <div className="w-[35rem] mt-16">
      <header className="mb-4 pb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl uppercase font-bold text-stone-600 mb-2">
            {title}
          </h1>
          <Button onClick={onDeleteProject}>Delete</Button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{description}</p>
      </header>

      {/* TASK */}
      <Task
        onAdd={onAddTask}
        onDelete={onDeleteTask}
        tasks={tasksList}
      />
    </div>
  );
}
