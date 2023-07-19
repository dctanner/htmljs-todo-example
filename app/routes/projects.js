import { Hono } from 'hono'
import { view, layout } from '../../htmy'
import { ListProjects, ViewProject } from '../views/project'
import { NewTodo } from '../views/todo'
import MainLayout from '../layouts/main'

const projectsRoute = new Hono()

// TODO run the actual route code when rendering each layout, and then put all the returned values into an object we pass along, like Remix does with routes. This way we don't have to make sure each route loads all the data that all the layouts it uses needs
projectsRoute.use('/*', layout(MainLayout))
projectsRoute.get('/', view(async ({ context }) => {
  const { results: projects } = await context.env.DB.prepare("SELECT * FROM projects").all();

  return ListProjects({ projects })
}))
// TODO write examples of the two routes below, but returning JSX inline, and also extracted into its own component and calling like layout(ViewProject)
// Example of a route that also functions as a layout
projectsRoute.use('/:projectId/*', layout(async ({ context, children }) => {
  const { projectId } = context.req.param()
  const project = await context.env.DB.prepare("SELECT * FROM projects WHERE id = ?").bind(projectId).first();
  const todosQuery = await context.env.DB.prepare("SELECT * FROM todos WHERE project_id = ?").bind(projectId).all();
  project.todos = todosQuery.results
  return ViewProject({ project, children })
}))
// Default sub-view when viewing a project is new todo form
projectsRoute.get('/:projectId/view', view(async ({ context }) => {
  const { projectId } = context.req.param()

  return NewTodo({
    projectId,
  })
}))

export default projectsRoute
