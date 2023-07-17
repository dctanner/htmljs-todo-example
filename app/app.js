import { Hono } from 'hono'
import todoRoute from './routes/todo'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))
app.route('/todo', todoRoute)

export default app
