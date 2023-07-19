import { Hono } from 'hono'
import { view } from '../../htmy'
import { ViewTodo, EditTodo } from '../views/todo'

// We mount todosRoute to '/:projectId/todos' so projectId is present in the params
// ViewProject is also applied as a layout to /:projectId/* so all routes below are rendered within it
const todosRoute = new Hono()

// If desired, you can move the logic below into your view function and just pass that to, like this: view(ViewTodo). The advantage of separating out the view from the logic is that you can reuse the view. E.g. we reuse ViewTodo in the .put() route below.
todosRoute.get('/:todoId', view(async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  const todo = await context.env.DB.prepare("SELECT * FROM todos WHERE id = ?").bind(todoId).first();

  return ViewTodo({
    projectId,
    todo,
  })
}))
todosRoute.get('/:todoId/edit', view(async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  const todo = await context.env.DB.prepare("SELECT * FROM todos WHERE id = ?").bind(todoId).first();

  return EditTodo({
    projectId,
    todo,
  })
}))
todosRoute.put('/:todoId', view(async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  const data = await context.req.parseBody()
  await context.env.DB.prepare("UPDATE todos SET name = ? WHERE id = ?").bind(data.text, todoId).run();
  const todo = await context.env.DB.prepare("SELECT * FROM todos WHERE id = ?").bind(todoId).first();

  return ViewTodo({
    projectId,
    todo,
  })
}))
// https://htmx.org/docs/#response-headers
// Submitting a form via htmx has the benefit of no longer needing the Post/Redirect/Get Pattern. After successfully processing a POST request on the server, you don’t need to return a HTTP 302 (Redirect). You can directly return the new HTML fragment.
// In this case the route /:todoId will be 404 for the deleted todo, so we do need to redirect, which we do by setting to HX-Location header
todosRoute.delete('/:todoId', view(async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  await context.env.DB.prepare("DELETE FROM todos WHERE id = ?").bind(todoId).run();
  context.header('HX-Location', `/projects/${projectId}`)
}))

export default todosRoute
