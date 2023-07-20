/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'
import { TodoListForProject, TodoForm } from '../routes/todos';

const ProjectLayout = async ({ context, children }) => {
  const { projectId } = context.req.param()
  const project = await context.env.DB.prepare("SELECT * FROM projects WHERE id = ?").bind(projectId).first();
  const todosQuery = await context.env.DB.prepare("SELECT * FROM todos WHERE project_id = ?").bind(projectId).all();
  project.todos = todosQuery.results

  return (
    <div class="flex">
      <div class="w-1/2">
        <h2 class="mb-2 text-lg font-semibold ">{project.name}</h2>
        <TodoListForProject project={project} />
        <TodoForm projectId={projectId} />
      </div>
      <div id="ViewProjectChildren" class="w-1/2">{children}</div>
    </div>
  )
}

export default ProjectLayout
