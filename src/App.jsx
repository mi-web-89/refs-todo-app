import { useState } from "react";
import ProjectSidebar from "./components/project-sidebar";
import NewProject from "./components/new-project";
import NoProjectSelecteed from "./components/no-project-selected";
import SelectedProject from "./components/selected-project";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined, // undefined => nothing
    projects: [],
    tasks:[] // prop drilling
  });

  // prop drilling
  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  // prop drilling
  function handleDeleteTask(taskId) {
    console.log('TASK ID', taskId);
    setProjectState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter(
        (task) => (task.id !== taskId) 
      ),
    }));
  }

  function handleStartAddProject() {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: null, // null -> new project
      };
    });
  }

  function handleAddProject(projectData) {
    // console.log('HANDLEADD', projectData)
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: id,
    }));
  }

  function handleDeleteProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      ),
    }));
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelecteed onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        data={projectState.projects}
        onSelectProject={handleSelectProject}
        onSelectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
