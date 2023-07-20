/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from 'hono/jsx'
import { Link } from '../../htmy';

const MainLayout = async (props) => {
  const { results: projects } = await props.context.env.DB.prepare("SELECT * FROM projects").all();
  const path = new URL(props.context.req.url).pathname
  return (
    <div>
      <header class="fixed top-0 z-[60] flex items-center justify-center w-full h-16 duration-500 ease-out bg-white border-b bg-opacity-90 backdrop-blur-md border-neutral-400 border-opacity-20">

        <div class="flex items-center justify-between w-full px-4 mx-auto 2xl:px-0 max-w-7xl">
          <div class="relative z-10 flex items-center w-auto leading-10 lg:flex-grow-0 lg:flex-shrink-0 lg:text-left">
            <a href="/" class="inline-flex sm:mr-8 items-center font-sans text-2xl font-extrabold text-left text-black no-underline bg-transparent cursor-pointer group focus:no-underline">
              Todos
              <span class="flex opacity-90 group-hover:scale-150 group-hover:opacity-100 items-center h-full group-hover:-rotate-6 ease-out duration-500 px-0.5 py-px ml-2 -translate-x-px text-[0.65rem] font-bold leading-none border-[2px] rounded border-black -translate-y-px">DEMO</span>
            </a>
            <nav class="items-center hidden space-x-5 text-sm font-medium lg:flex">
              <a class="relative transition-colors text-neutral-700 hover:text-black group" href="/projects">
                <span>Projects</span>
                <span class="absolute bottom-0 w-0 h-0.5 duration-300 ease-out bg-black group-hover:w-full left-1/2 group-hover:left-0 group-hover:-translate-x-0"></span>
              </a>
            </nav>
          </div>
          <div class="relative space-x-1 font-medium leading-10 sm:space-x-2 md:flex-grow-0 md:flex-shrink-0 md:text-right lg:flex-grow-0 lg:flex-shrink-0">
            <button class="inline-flex items-center px-3 sm:px-5 text-sm border-0 rounded-md cursor-pointer h-9 focus:outline-none md:mt-0 text-neutral-900 hover:text-neutral-800 hover:bg-neutral-100">
              Login
            </button>
            <button class="inline-flex items-center px-3 sm:px-5 text-sm border-0 rounded-md cursor-pointer h-9 focus:outline-none md:mt-0 bg-neutral-900 hover:bg-neutral-800 hover:text-white text-gray-100">
              Signup
            </button>
          </div>
        </div>
      </header>


      <main class="relative flex items-start min-h-screen 2xl:px-0 lg:px-4 px-5 pt-0 pb-0 mx-auto mt-1 max-w-7xl rounded-t-3xl">
        <aside class="fixed block w-56 h-screen max-h-screen pt-20 pb-5 pr-5 overflow-scroll bg-white lg:pt-8 lg:pb-16 z-20 top-[55px]">
          <h2 class="relative px-2 py-1 mb-2 text-sm font-semibold rounded-md">My Projects</h2>
          <div class="relative grid grid-flow-row text-sm mb-7 auto-rows-max">
            {projects.map((project) => (
              <Link class={`group flex w-full items-center rounded-md border px-2 py-1.5 ${path === `/projects/${project.id}/view` ? 'bg-gray-100 border-gray-200/60' : 'border-transparent'}`} to={`/projects/${project.id}/view`}>{project.name}</Link>
            ))}
          </div>
        </aside>
        <div id="content" class="relative flex-shrink-0 w-full h-auto py-5 pr-0 lg:pl-64 lg:pr-64">
          {props.children}
        </div>
      </main>
    </div>
  )
}

export default MainLayout
