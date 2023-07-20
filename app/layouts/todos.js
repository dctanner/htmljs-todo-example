/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'
import { TodoListForProject } from '../routes/todos';

const TodosLayout = async ({ context, children }) => {
  const { projectId } = context.req.param()
  const project = await context.env.DB.prepare("SELECT * FROM projects WHERE id = ?").bind(projectId).first();
  const todosQuery = await context.env.DB.prepare("SELECT * FROM todos WHERE project_id = ?").bind(projectId).all();
  project.todos = todosQuery.results

  return (
    <div>
      <h1 class="text-2xl">{project.name}</h1>
      <button class="btn" hx-get={`/projects/${project.id}/todos/new`} hx-target="#ViewProjectChildren">Add Todo</button>
      <TodoListForProject project={project} />
      <div id="ViewProjectChildren">{children}</div>
    </div>
  )
}

export default TodosLayout
