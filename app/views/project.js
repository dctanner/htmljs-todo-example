/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

import { ListTodos } from './todo'

export const ListProjects = ({ projects }) => (
  <ul>
    {projects.map((project) => (
      <li id={`todo-${project.id}`}>{project.text}</li>
    ))}
  </ul>
)

export const ViewProject = ({ project }) => (
  <div>
    <h2>{project.text}</h2>
    <ListTodos todos={project.todos} />
  </div>
)
