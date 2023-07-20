/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'
import { Link } from '../../htmy'
import { TodoForm, TodoListForProject } from './todos'

export const GetProject = async ({ context }) => {
  const { projectId } = context.req.param()

  // Default sub-view when viewing a project is new todo form
  return <TodoForm projectId={projectId} />
}

export const ListProjects = async ({ context }) => {
  const { results: projects } = await context.env.DB.prepare("SELECT * FROM projects").all();

  return (
    <div class="flex flex-col w-full">
      <h1 class="text-2xl">My Projects</h1>
      <ul class="menu bg-base-100">
        {projects.map((project) => (
          <li id={`todo-${project.id}`}>
            <Link class="text-blue-500" to={`/projects/${project.id}/view`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const ProjectLayout = async ({ context, children }) => {
  const { projectId } = context.req.param()
  const project = await context.env.DB.prepare("SELECT * FROM projects WHERE id = ?").bind(projectId).first();
  const todosQuery = await context.env.DB.prepare("SELECT * FROM todos WHERE project_id = ?").bind(projectId).all();
  project.todos = todosQuery.results

  return (
    <div>
      <div class="text-sm breadcrumbs">
        <ul>
          <li><Link class="" to="/projects">My Projects</Link></li>
          <li>{project.name}</li>
        </ul>
      </div>
      <h1 class="text-2xl">{project.name}</h1>
      <button class="btn" hx-get={`/projects/${project.id}/todos/new`} hx-target="#ViewProjectChildren">Add Todo</button>
      <TodoListForProject project={project} />
      <div id="ViewProjectChildren">{children}</div>
    </div>
  )
}
