/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

import { Link, Form } from '../../htmy'

export const ListTodos = ({ project }) => (
  <ul>
    {project.todos.map((todo) => (
      <li id={`todo-${todo.id}`}>
        <Link to={`/projects/${project.id}/todos/${todo.id}`} hx-target="#ViewProjectChildren">{todo.text}</Link>
      </li>
    ))}
  </ul>
)

export const ViewTodo = ({ project, todo }) => (
  <div>
    <h2>{todo.text}</h2>
    <button hx-get={`/projects/${project.id}/todos/${todo.id}/edit`} hx-target="#ViewProjectChildren">Edit</button>
    <button>Delete</button>
  </div>
)

export const EditTodo = ({ project, todo }) => (
  // Like Link, there is an optional hx-target param which if included will replace the contents of the target element with the response. If omitted, the response will replace the entire body (still using ajax to make it performant). When updating data you will often want to omit hx-target so that everything on the page is updated with the new values.
  <Form action={`/projects/${project.id}/todos/${todo.id}`} method="put">
    <input type="text" name="text" value={todo.text} />
    <button type="submit">Save</button>
  </Form>
)
