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

export default todosRoute
