import { html } from 'hono/html'
import AppLayout from './app/layouts/app.js'

// TODO create our own extension of Hono's class, that lets you set a default route layout and automatically wraps html/jsx returned from a route in this layout() function
// template is an array of html/jsx literals, the first is the final view to render and never takes the children prop, every additional array item is a layout component that must take the children prop
// export const layout = (c, templates, props = {}) => {
//   if (c.req.header('HX-Request') === 'true') { // TODO should we also check for ajax req here?
//     // We check if the req is for the whole body or just a partial, then include the Layout or not
//     // TODO hoist applLayoutProps values like title into the head with some custom htmx that works like https://htmx.org/docs/#oob_swaps but on the <head>
//     if (c.req.header('HX-Boosted') === 'true') {
//       // Render each template passing the previous template as the children prop
//       const template = templates.reduce((children, template) => {
//         return template({
//           ...props,
//           children,
//         })
//       }, '')
//       return c.html(template)
//     } else {
//       // TODO I think we need somehow join the hx-taget with the template layout names passed or the route's path
//       // TODO add in hx attrs to do partial updates
//       return c.html(templates[0](props))
//     }
//   } else {
//     // Req is a normal request, so we render the whole page
//     // Add in the AppLayout to the end of the templates array
//     templates.push(AppLayout)
//     // Render each template passing the previous template as the children prop
//     const template = templates.reduce((children, template) => {
//       return template({
//         ...props,
//         children,
//       })
//     }, '')
//     return c.html(template)
//   }
// }

export const view = (viewToRender) => {
  return async (c) => {
    const newBody = await viewToRender({ context: c })
    return c.html(newBody)
  }
}

export const rootLayout = (layoutToApply) => {
  return async (c, next) => {
    await next()
    if (c.req.header('HX-Request') !== 'true') {
      // Req is a normal request, so we render the whole page which means adding the root layout
      const curBody = await c.res.text()
      c.res = undefined // To overwrite res, set it to undefined before setting new value https://github.com/honojs/hono/pull/970 released in https://github.com/honojs/hono/releases/tag/v3.1.0
      const newBody = await layoutToApply({ children: html(curBody) })
      c.res = c.html(newBody)
    }
    // Else do nothing and let the original response be sent
  }
}

export const layout = (layoutToApply) => {
  return async (c, next) => {
    await next()
    if ((c.req.header('HX-Request') === 'true' && c.req.header('HX-Boosted') === 'true') || c.req.header('HX-Request') !== 'true') {
      // Req is regular req or boosted link, so we apply layouts
      const curBody = await c.res.text()
      c.res = undefined // To overwrite res, set it to undefined before setting new value https://github.com/honojs/hono/pull/970 released in https://github.com/honojs/hono/releases/tag/v3.1.0
      const newBody = await layoutToApply({ context: c, children: html(curBody) })
      c.res = c.html(newBody)
    }
    // Else do nothing and let the original response be sent, which will be a partial update applied to the page with hx-target
  }
}

export const Link = ({ to, "hx-target": hxTarget, "class": className, children }) => {
  if (hxTarget) {
    return html`<a href="${to}" class="${className}" hx-get="${to}" hx-target="${hxTarget}" hx-push-url="true" hx-swap="morph">${children}</a>`
  } else {
    return html`<a href="${to}" class="${className}" hx-boost="true">${children}</a>`
  }
}

export const Form = ({ action, method, "hx-target": hxTarget, children }) => {
  if (hxTarget) {
    switch (method) {
      case "get":
        return html`<form hx-get="${action}" hx-target="${hxTarget}" hx-push-url="true" hx-swap="morph">${children}</form>`
      case "post":
        return html`<form hx-post="${action}" hx-target="${hxTarget}" hx-push-url="true" hx-swap="morph">${children}</form>`
      case "put":
        return html`<form hx-put="${action}" hx-target="${hxTarget}" hx-push-url="true" hx-swap="morph">${children}</form>`
      case "delete":
        return html`<form hx-delete="${action}" hx-target="${hxTarget}" hx-push-url="true" hx-swap="morph">${children}</form>`
    }
  } else {
    return html`<form action="${action}" method="${method}" hx-boost="true">${children}</form>`
  }
}
