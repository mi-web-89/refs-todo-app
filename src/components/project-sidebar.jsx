import Button from "./button";

export default function ProjectSidebar({
  onStartAddProject,
  data,
  onSelectProject,
  onSelectedProjectId,
}) {
  let content;

  if (data && data.length > 0) {
    content = data.map((project) => {
      let cssClasses =
        "w-full text-left px-2 py-1 rounded-sm hover:text-stone-200 hover:bg-stone-800";

      if (project.id === onSelectedProjectId) {
        cssClasses += " bg-stone-800 text-stone-200";
      } else {
        cssClasses += " text-stone-400";
      }

      return (
        <li key={project.id}>
          <button
            onClick={() => onSelectProject(project.id)}
            className={cssClasses}
          >
            {project.title}
          </button>
        </li>
      );
    });
  } else {
    content = <p className="text-center">No have project...</p>;
  }

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Project
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-5 p-4 rounded border border-stone-100">{content}</ul>
    </aside>
  );
}
