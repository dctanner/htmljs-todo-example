/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

export const ListTodos = ({ todos }) => (
  <ul>
    {todos.map((todo) => (
      <li id={`todo-${todo.id}`}>{todo.text}</li>
    ))}
  </ul>
)

export const ViewTodo = ({ todo }) => (
  <div>
    <h2>{todo.text}</h2>
  </div>
)
