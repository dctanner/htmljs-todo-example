import { Hono } from 'hono'
import projectRoute from './routes/projects'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))
app.route('/projects', projectRoute)

export default app
