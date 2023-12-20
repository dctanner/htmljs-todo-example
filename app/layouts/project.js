/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'
import { TodoListForProject, NewTodoForm } from '../routes/todos';
import {getProjectById,getTodoById,getTodosByProjectId} from '../../db/db.js';

const ProjectLayout = async ({ context, children }) => {
  const { projectId } = context.req.param()
  const project = getProjectById(projectId);
  const todosQuery = getTodosByProjectId(projectId);
  console.log("todosQuery",projectId,todosQuery,"project",project)


  return (
    <div class="flex">
      <div class="w-1/2">
        <h2 class="mb-2 text-lg font-semibold ">{project.name}</h2>
        <TodoListForProject project={project} />
        <NewTodoForm projectId={projectId} />
      </div>
      <div id="ViewProjectChildren" class="w-1/2">{children}</div>
    </div>
  )
}

export default ProjectLayout
