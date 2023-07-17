/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

import { Link } from '../../htmy'

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

export const EditTodo = ({ todo }) => (
  <form>
    <input type="text" value={todo.text} />
    <button>Save</button>
  </form>
)
