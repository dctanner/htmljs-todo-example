import { Hono } from 'hono'
import { ListTodos } from '../views/todo'
import { layout } from '../../htmy'
import { html } from 'hono/html'
/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

// Route layouts get passed the same props as the route's view
// TODO find a way to pull out the view's props and pass them here too
const TodoLayout = (props) => html`
<main>
  <h1>Todos</h1>
  ${props.children}
</main>
`

const todoRoute = new Hono()

todoRoute.get('/:id', (c) => {
  // Render jsx, either using an imported view function or just write the jsx inline here
  // return layout(c, <ListTodos todos={todos} />, TodoLayout, { title: 'Todos' })
  // You can also render by calling the view function
  // return layout(c, ListTodos({ todos }), TodoLayout)
  // Or using a html literal
  // return html`
  //   <ul>
  //     <li>Todo 1</li>
  //   </ul>
  // `
})

export default todoRoute
