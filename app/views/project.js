/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

import { ListTodos } from './todo'

export const ListProjects = ({ projects }) => (
  <div>
    <h1>Projects</h1>
    <ul>
      {projects.map((project) => (
        <li id={`todo-${project.id}`}>{project.text}</li>
      ))}
    </ul>
  </div>
)

export const ViewProject = ({ project, children }) => (
  <div>
    <h1>{project.text}</h1>
    <ListTodos project={project} />
    <div>
      <h2>Todo detail area</h2>
      {children}
    </div>
  </div>
)
