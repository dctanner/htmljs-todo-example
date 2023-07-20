/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'
import { Link, Form } from '../../htmy'

export const TodoForm = ({ projectId }) => (
  // Like Link, there is an optional hx-target param which if included will replace the contents of the target element with the response. If omitted, the response will replace the entire body (still using ajax to make it performant). When updating data you will often want to omit hx-target so that everything on the page is updated with the new values.
  <Form action={`/projects/${projectId}/todos/new`} method="post">
    <div class="flex gap-2 mt-4">
      <input type="text" name="name" placeholder="Todo name..." autofocus class="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
      <button class="btn" type="submit">Create</button>
    </div>
  </Form>
)

export const TodoView = ({ projectId, todo }) => (
  <div class="flex justify-between gap-2">
    <h2 class="text-xl">{todo.name}</h2>
    <div class="flex gap-2">
      <button class="btn-outline" hx-get={`/projects/${projectId}/todos/${todo.id}/edit`} hx-target="#ViewProjectChildren">Edit</button>
      <button class="btn-outline" hx-delete={`/projects/${projectId}/todos/${todo.id}`} hx-target="body">Delete</button>
    </div>
  </div>
)

export const TodoListForProject = ({ project }) => (
  <ul class="menu bg-base-100">
    {project.todos.map((todo) => (
      <li id={`todo-${todo.id}`} class="">
        <Link class="text-md py-1.5 block hover:underline" to={`/projects/${project.id}/todos/${todo.id}`} hx-target="#ViewProjectChildren">{todo.name || "Blank Name"}</Link>
      </li>
    ))}
  </ul>
)

export const CreateTodo = async ({ context }) => {
  const { projectId } = context.req.param()
  const data = await context.req.parseBody()
  // TODO validate data.name isn't blank
  await context.env.DB.prepare("INSERT INTO todos (name, project_id) VALUES (?, ?) RETURNING *").bind(data.name, projectId).first();
  context.header('HX-Push', `/projects/${projectId}/view`)
  return <div></div>
}

export const GetTodo = async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  const todo = await context.env.DB.prepare("SELECT * FROM todos WHERE id = ?").bind(todoId).first();

  return <TodoView projectId={projectId} todo={todo} />
}

export const UpdateTodo = async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  const data = await context.req.parseBody()
  // TODO validate data.name isn't blank
  const todo = await context.env.DB.prepare("UPDATE todos SET name = ? WHERE id = ? RETURNING *").bind(data.name, todoId).first();

  return <TodoView projectId={projectId} todo={todo} />
}

// TODO make editing form inline with todo list
export const EditTodo = async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  const todo = await context.env.DB.prepare("SELECT * FROM todos WHERE id = ?").bind(todoId).first();

  return (
    <Form action={`/projects/${projectId}/todos/${todo.id}`} method="put">
      <div class="flex gap-2">
        <input type="text" name="name" value={todo.name} autofocus class="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
        <button class="btn" type="submit">Save</button>
      </div>
    </Form>
  )
}

// https://htmx.org/docs/#response-headers
// Submitting a form via htmx has the benefit of no longer needing the Post/Redirect/Get Pattern. After successfully processing a POST request on the server, you don’t need to return a HTTP 302 (Redirect). You can directly return the new HTML fragment.
// In this case the route /:todoId will be 404 for the deleted todo, so we do need to redirect, which we do by setting to HX-Location header
export const DeleteTodo = async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  await context.env.DB.prepare("DELETE FROM todos WHERE id = ?").bind(todoId).run();
  // Two ways to redirect:
  // 1. Set HX-Redirect and htmx will redirect to that URL and replace the body with the response
  // context.header('HX-Redirect', `/projects/${projectId}/view`)
  // 2. Set HX-Push which updates the browser URL, and then return NewTodo which we want to show after deleting a todo, which is rendered and replaces the body
  context.header('HX-Push', `/projects/${projectId}/view`)
  return <div></div>
}
