/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'
import { Link } from '../../htmljs'
import { z } from 'zod'
import { deleteTodo, 
  getProjectById, 
  getTodoById, 
  getAllProjects, 
  getTodosByProjectId, 
  insertTodo, 
  updateTodoDoneStatus, 
  updateTodoName } from '../../db/db.js'

const todoSchema = z.object({
  name: z.string().min(1),
})

const FormErrorText = ({ children }) => {
  return (
    <p class="text-sm text-red-500 font-semibold mt-1">
      {children?.join(" ")}
    </p>
  )
}

export const NewTodoForm = ({ projectId, errors }) => (
  // We use hx-boost because we want the whole page to update
  <form id="new-todo-form" hx-post={`/projects/${projectId}/todos/new`} hx-push-url="false" hx-target="#new-todo-form">
    <div class="flex gap-2 mt-4 pt-6 border-t border-gray-100  ">
      <input type="text" name="name" placeholder="Todo name..." autofocus class="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
      <button class="btn" type="submit">Add todo</button>
    </div>
    <FormErrorText>{errors?.name}</FormErrorText>
  </form>
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

export const TodoListItem = ({ todo, projectId }) => (
  <li id={`todo-${todo.id}`} class="flex items-center gap-2">
    <form hx-put={`/projects/${projectId}/todos/${todo.id}/state`} hx-trigger="mouseup delay:50ms" hx-target={`#todo-${todo.id}`} hx-push-url="false" class="m-0">
      <input name={`todo-${todo.id}-checkbox`} id={`todo-${todo.id}-checkbox`} type="checkbox" class="hidden peer" checked={!!todo.done} />
      <label for={`todo-${todo.id}-checkbox`} class="peer-checked:[&_svg]:scale-100 text-sm font-medium text-neutral-600 peer-checked:text-blue-600 [&_svg]:scale-0 peer-checked:[&_.custom-checkbox]:border-blue-500 peer-checked:[&_.custom-checkbox]:bg-blue-500 select-none flex items-center space-x-2">
        <span class="flex items-center justify-center w-5 h-5 border-2 rounded-full custom-checkbox text-neutral-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3 h-3 text-white duration-300 ease-out">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
      </label>
    </form>
    <Link class={`flex-grow text-md py-1.5 block hover:underline ${todo.done && 'line-through hover:line-through'}`} to={`/projects/${projectId}/todos/${todo.id}`} hx-target="#ViewProjectChildren">{todo.name || "Blank Name"}</Link>
  </li>
)

export const TodoListForProject = ({ project }) => { 
  const projectId=project.id;
  const todos=getTodosByProjectId(projectId);
 
  console.log("projectId",projectId,"todos",todos)
  return (
  <ul class="menu bg-base-100">
    {todos.map((todo) => (
      <TodoListItem todo={todo} projectId={project.id} />
    ))}
  </ul>
)
    }

export const CreateTodo = async ({ context }) => {
  const { projectId } = context.req.param()
  const formData = await context.req.parseBody()
  const parsed = todoSchema.safeParse(formData)
  if (parsed.success) {
    // await context.env.DB.prepare("INSERT INTO todos (name, project_id) VALUES (?, ?) RETURNING *").bind(parsed.data.name, projectId).first();
    insertTodo(parsed.data.name, projectId);
    context.header('HX-Location', `/projects/${projectId}/view`)
    return <NewTodoForm projectId={projectId} />
  } else {
    console.log('errors', parsed.error.flatten().fieldErrors)
    return <NewTodoForm projectId={projectId} errors={parsed.error.flatten().fieldErrors} />
  }
}

export const GetTodo = async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  // const todo = await context.env.DB.prepare("SELECT * FROM todos WHERE id = ?").bind(todoId).first();
  const todo =getTodoById(todoId)

  return <TodoView projectId={projectId} todo={todo} />
}

export const UpdateTodo = async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  const data = await context.req.parseBody()
  // TODO validate data.name isn't blank
//  const todo = await context.env.DB.prepare("UPDATE todos SET name = ? WHERE id = ? RETURNING *").bind(data.name, todoId).first();
const todo =updateTodoName(todoId,data.name)
  return <TodoView projectId={projectId} todo={todo} />
}

export const UpdateTodoState = async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  const data = await context.req.parseBody()
  //const todo = await context.env.DB.prepare("UPDATE todos SET done = ? WHERE id = ? RETURNING *").bind(data[`todo-${todoId}-checkbox`] === "on" ? 1 : 0, todoId).first();
  const todo =updateTodoDoneStatus(todoId,data[`todo-${todoId}-checkbox`] === "on" ? 1 : 0);
  return <TodoListItem projectId={projectId} todo={todo} />
}

// TODO make editing form inline with todo list
export const EditTodo = async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  //const todo = await context.env.DB.prepare("SELECT * FROM todos WHERE id = ?").bind(todoId).first();
  const todo = getTodoById(todoId);
  return (
    <form action={`/projects/${projectId}/todos/${todo.id}`} method="put" hx-push-url="true" hx-boost="true">
      <div class="flex gap-2">
        <input type="text" name="name" value={todo.name} autofocus class="flex w-full h-10 px-3 py-2 text-sm bg-white border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
        <button class="btn" type="submit">Save</button>
      </div>
    </form>
  )
}

// https://htmx.org/docs/#response-headers
// Submitting a form via htmx has the benefit of no longer needing the Post/Redirect/Get Pattern. After successfully processing a POST request on the server, you don’t need to return a HTTP 302 (Redirect). You can directly return the new HTML fragment.
// In this case the route /:todoId will be 404 for the deleted todo, so we do need to redirect, which we do by setting to HX-Location header
export const DeleteTodo = async ({ context }) => {
  const { projectId, todoId } = context.req.param()
  //await context.env.DB.prepare("DELETE FROM todos WHERE id = ?").bind(todoId).run();
  deleteTodo(todoId);
  // Two ways to redirect:
  // 1. Set HX-Redirect and htmx will redirect to that URL and replace the body with the response
  // context.header('HX-Redirect', `/projects/${projectId}/view`)
  // 2. Set HX-Push which updates the browser URL, and then return NewTodo which we want to show after deleting a todo, which is rendered and replaces the body
  context.header('HX-Push', `/projects/${projectId}/view`)
  return <div></div>
}
