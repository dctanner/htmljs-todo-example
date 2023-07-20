/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'
import { Hono } from 'hono'
import { rootLayout, layout, view } from '../htmy'
import AppLayout from './layouts/app'
import MainLayout from './layouts/main'
import ProjectLayout from './layouts/project'
import { CreateTodo, DeleteTodo, EditTodo, GetTodo, UpdateTodo } from './routes/todos'

const app = new Hono()

app.use('*', rootLayout(AppLayout))
app.use('*', layout(MainLayout))
app.use('/projects/:projectId/*', layout(ProjectLayout)) // Example of a nested layout
app.get('/projects/:projectId/view', view(() => <div></div>)) // ProjectLayout is where the project is actually rendered. Here we just return the right sidebar content where we show the selected todo, which is blank when first viewing a project
app.post('/projects/:projectId/todos/new', view(CreateTodo))
app.get('/projects/:projectId/todos/:todoId', view(GetTodo))
app.put('/projects/:projectId/todos/:todoId', view(UpdateTodo))
app.delete('/projects/:projectId/todos/:todoId', view(DeleteTodo))
app.get('/projects/:projectId/todos/:todoId/edit', view(EditTodo))

export default app
