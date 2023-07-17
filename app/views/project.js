/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

import { Link } from '../../htmy'
import { ListTodos } from './todo'

export const ListProjects = ({ projects }) => (
  <div>
    <h1>Projects</h1>
    <ul>
      {projects.map((project) => (
        <li id={`todo-${project.id}`}>
          <Link href={`/projects/${project.id}`}>{project.text}</Link>
        </li>
      ))}
    </ul>
  </div>
)

export const ViewProject = ({ project, children }) => (
  <div>
    <Link href="/projects">&laquo; Back to all projects</Link>
    <h1>{project.text}</h1>
    <ListTodos project={project} />
    <div>
      <h2>Todo detail area</h2>
      {children}
    </div>
  </div>
)
