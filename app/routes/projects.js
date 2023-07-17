import { Hono } from 'hono'
import { ListProjects, ViewProject } from '../views/project'
import { layout } from '../../htmy'
import todoRoute from './todos'
import { html } from 'hono/html'
/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

const PROJECTS = [
  {
    id: 1, text: 'Shopping List', todos: [
      { id: 1, text: 'Buy milk' },
      { id: 2, text: 'Buy eggs' },
      { id: 3, text: 'Buy bread' },
    ]
  },
  {
    id: 2, text: 'Errands', todos: [
      { id: 1, text: 'Pick up dry cleaning' },
      { id: 2, text: 'Get car washed' },
      { id: 3, text: 'Pick up groceries' },
    ]
  },
]

// Route layouts get passed the same props as the route's view
// TODO find a way to pull out the view's props and pass them here too
const ProjectLayout = (props) => html`
<main>
  <h1>Projects</h1>
  ${props.children}
</main>
`

const projectRoute = new Hono()

projectRoute.get('/', (c) => {
  const projects = PROJECTS
  return layout(c, <ListProjects projects={projects} />, ProjectLayout, { title: 'Projects' })
})
projectRoute.get('/:id', (c) => {
  const { id } = c.req.param()
  const project = PROJECTS[id]
  return layout(c, <ViewProject project={project} />, ProjectLayout, { title: project.text })
})
// projectRoute.route('/todo', todoRoute)

export default projectRoute
