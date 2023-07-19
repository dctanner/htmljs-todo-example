import { Hono } from 'hono'
import { view } from '../../htmy'
import { ViewTodo, NewTodo, EditTodo } from '../views/todo'

// We mount todosRoute to '/:projectId/todos' so projectId is present in the params
// ViewProject is also applied as a layout to /:projectId/* so all routes below are rendered within it
const todosRoute = new Hono()

// If desired, you can move the logic below into your view function and just pass that to, like this: view(ViewTodo). The advantage of separating out the view from the logic is that you can reuse the view. E.g. we reuse ViewTodo in the .put() route below.
todosRoute.get('/new', view(async ({ context }) => {
  const { projectId } = context.req.param()

  return NewTodo({
    projectId,
  })
}))
todosRoute.post('/new', view(async ({ context }) => {
  const { projectId } = context.req.param()
  const data = await context.req.parseBody()
  // TODO validate data.name isn't blank
  const todo = await context.env.DB.prepare("INSERT INTO todos (name, project_id) VALUES (?, ?) RETURNING *").bind(data.name, projectId).first();

  return NewTodo({
    projectId,
  })
}))
todosRoute.get('/:todoId', view(async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  const todo = await context.env.DB.prepare("SELECT * FROM todos WHERE id = ?").bind(todoId).first();

  return ViewTodo({
    projectId,
    todo,
  })
}))
todosRoute.put('/:todoId', view(async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  const data = await context.req.parseBody()
  // TODO validate data.name isn't blank
  const todo = await context.env.DB.prepare("UPDATE todos SET name = ? WHERE id = ? RETURNING *").bind(data.name, todoId).first();

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
// https://htmx.org/docs/#response-headers
// Submitting a form via htmx has the benefit of no longer needing the Post/Redirect/Get Pattern. After successfully processing a POST request on the server, you don’t need to return a HTTP 302 (Redirect). You can directly return the new HTML fragment.
// In this case the route /:todoId will be 404 for the deleted todo, so we do need to redirect, which we do by setting to HX-Location header
todosRoute.delete('/:todoId', view(async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  await context.env.DB.prepare("DELETE FROM todos WHERE id = ?").bind(todoId).run();
  // Two ways to redirect:
  // 1. Set HX-Redirect and htmx will redirect to that URL and replace the body with the response
  // context.header('HX-Redirect', `/projects/${projectId}/view`)
  // 2. Set HX-Push which updates the browser URL, and then return NewTodo which we want to show after deleting a todo, which is rendered and replaces the body
  context.header('HX-Push', `/projects/${projectId}/view`)
  return NewTodo({
    projectId,
  })
}))

export default todosRoute
