import { Hono } from 'hono'
import { ListProjects, ViewProject } from '../views/project'
import { ViewTodo, EditTodo } from '../views/todo'
import { layout } from '../../htmy'
// import todoRoute from './todos'
import { html } from 'hono/html'
/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'

const PROJECTS = [
  {
    id: 0, text: 'Shopping List', todos: [
      { id: 0, text: 'Buy milk' },
      { id: 1, text: 'Buy eggs' },
      { id: 2, text: 'Buy bread' },
    ]
  },
  {
    id: 1, text: 'Errands', todos: [
      { id: 0, text: 'Pick up dry cleaning' },
      { id: 1, text: 'Get car washed' },
      { id: 2, text: 'Pick up groceries' },
    ]
  },
]

// Route layouts get passed the same props as the route's view
// TODO find a way to pull out the view's props and pass them here too
const ProjectsLayout = (props) => html`
<main>
  <h1>My Todo App</h1>
  ${props.children}
</main>
`

const projectsRoute = new Hono()

projectsRoute.get('/', (c) => {
  const projects = PROJECTS
  return layout(c, [ListProjects, ProjectsLayout], {
    title: 'Projects',
    projects,
  })
})
projectsRoute.get('/:projectId', (c) => {
  const { projectId } = c.req.param()
  const project = PROJECTS[projectId]
  return layout(c, [ViewProject, ProjectsLayout], {
    title: project.text,
    project,
  })
})
// projectRoute.route('/:projectId/todos', todosRoute) // Move routes below to its own file and mount here
projectsRoute.get('/:projectId/todos/:todoId', (c) => {
  const { projectId, todoId } = c.req.param()
  const project = PROJECTS[projectId]
  const todo = project.todos[todoId]
  return layout(c, [ViewTodo, ViewProject, ProjectsLayout], {
    title: `${project.text} - ${todo.text}`,
    project,
    todo,
  })
})
projectsRoute.get('/:projectId/todos/:todoId/edit', (c) => {
  const { projectId, todoId } = c.req.param()
  const project = PROJECTS[projectId]
  const todo = project.todos[todoId]
  return layout(c, [EditTodo, ViewProject, ProjectsLayout], {
    title: `Edit ${todo.text}`,
    project,
    todo,
  })
})

export default projectsRoute
