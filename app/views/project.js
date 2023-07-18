/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

import { Link } from '../../htmy'
import { ListTodos } from './todo'

export const ListProjects = ({ projects }) => (
  <div>
    <h1 class="text-2xl">My Projects</h1>
    <ul class="menu bg-base-100">
      {projects.map((project) => (
        <li id={`todo-${project.id}`}>
          <Link class="text-blue-500" to={`/projects/${project.id}`}>{project.text}</Link>
        </li>
      ))}
    </ul>
  </div>
)

export const ViewProject = ({ project, children }) => (
  <div>
    <div class="text-sm breadcrumbs">
      <ul>
        <li><Link class="" to="/projects">My Projects</Link></li>
        <li>{project.text}</li>
      </ul>
    </div>
    <h1 class="text-2xl">{project.text}</h1>
    <ListTodos project={project} />
    <div id="ViewProjectChildren">{children}</div>
  </div>
)
