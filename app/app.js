import { Hono } from 'hono'
import { rootLayout } from '../htmy'
import AppLayout from './layouts/app'
import projectRoute from './routes/projects'

const app = new Hono()

app.use('*', rootLayout(AppLayout))
app.get('/', (c) => c.text('Hello Hono!'))
app.route('/projects', projectRoute)

export default app
