import { Hono } from 'hono'
import { rootLayout, layout, view } from '../htmy'
import AppLayout from './layouts/app'
import MainLayout from './layouts/main'
import TodosLayout from './layouts/todos'
import { GetProject } from './routes/projects'
import { CreateTodo, DeleteTodo, EditTodo, GetTodo, NewTodo, UpdateTodo } from './routes/todos'

const app = new Hono()

app.use('*', rootLayout(AppLayout))
app.use('*', layout(MainLayout))
app.use('/projects/:projectId/*', layout(TodosLayout)) // Example of a nested layout
app.get('/projects/:projectId/view', view(GetProject))
app.get('/projects/:projectId/todos/new', view(NewTodo))
app.post('/projects/:projectId/todos/new', view(CreateTodo))
app.get('/projects/:projectId/todos/:todoId', view(GetTodo))
app.put('/projects/:projectId/todos/:todoId', view(UpdateTodo))
app.delete('/projects/:projectId/todos/:todoId', view(DeleteTodo))
app.get('/projects/:projectId/todos/:todoId/edit', view(EditTodo))

export default app
