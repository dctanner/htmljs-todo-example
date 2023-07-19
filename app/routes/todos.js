import { Hono } from 'hono'
import { view } from '../../htmy'
import { ViewTodo, EditTodo } from '../views/todo'
import { PROJECTS } from '../db'

// We mount todosRoute to '/:projectId/todos' so projectId is present in the params
// ViewProject is also applied as a layout to /:projectId/* so all routes below are rendered within it
const todosRoute = new Hono()

// If desired, you can move the logic below into your view function and just pass that to, like this: view(ViewTodo). The advantage of separating out the view from the logic is that you can reuse the view. E.g. we reuse ViewTodo in the .put() route below.
todosRoute.get('/:todoId', view(({ context }) => {
  const { projectId, todoId } = context.req.param()
  const project = PROJECTS[projectId]
  const todo = project.todos[todoId]

  return ViewTodo({
    project,
    todo,
  })
}))
todosRoute.get('/:todoId/edit', view(({ context }) => {
  const { projectId, todoId } = context.req.param()
  const project = PROJECTS[projectId]
  const todo = project.todos[todoId]

  return EditTodo({
    project,
    todo,
  })
}))
todosRoute.put('/:todoId', view(async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  // Here we would update the todo in the db
  const data = await context.req.parseBody()
  PROJECTS[projectId].todos[todoId].text = data.text

  const project = PROJECTS[projectId]
  const todo = project.todos[todoId]

  return ViewTodo({
    project,
    todo,
  })
}))

export default todosRoute
