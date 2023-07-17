/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

import { Link } from '../../htmy'

export const ListTodos = ({ project }) => (
  <ul>
    {project.todos.map((todo) => (
      <li id={`todo-${todo.id}`}>
        <Link to={`/projects/${project.id}/todo/${todo.id}`} replace="#ViewProjectChildren">{todo.text}</Link>
      </li>
    ))}
  </ul>
)

export const ViewTodo = ({ todo }) => (
  <div>
    <h2>{todo.text}</h2>
    <button>Edit</button>
    <button>Delete</button>
  </div>
)
