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
