/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'
import { TodoForm } from './todos'

export const GetProject = async ({ context }) => {
  const { projectId } = context.req.param()

  // Default sub-view when viewing a project is new todo form
  return <TodoForm projectId={projectId} />
}
