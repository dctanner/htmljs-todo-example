import { Hono } from 'hono'
import { rootLayout } from '../htmy'
import AppLayout from './layouts/app'
import projectsRoute from './routes/projects'
import todosRoute from './routes/todos'

const app = new Hono()

app.use('*', rootLayout(AppLayout))
app.get('/', (c) => c.text('Hello Hono!'))
app.route('/projects', projectsRoute)
app.route('/projects/:projectId/todos', todosRoute)

export default app
