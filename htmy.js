import AppLayout from './app/layouts/app.js'

// TODO create our own extension of Hono's class, that lets you set a default route layout and automatically wraps html/jsx returned from a route in this layout() function
// TODO should we make it an array you pass? So you can nest may layouts together
export const layout = (c, template, templateLayout, appLayoutProps = {}) => {
  if (c.req.header('HX-Request')) { // TODO should we also check for ajax req here?
    // We check if the req is for the whole body or just a partial, then include the Layout or not
    // TODO hoist applLayoutProps values like title into the head with some custom htmx that works like https://htmx.org/docs/#oob_swaps but on the <head>
    if (c.req.header('HX-Target') === 'body') {
      return c.html(templateLayout({
        children: template,
      }))
    } else {
      // TODO add in hx attrs to do partial updates
      return c.html(template)
    }
  } else {
    // Req is a normal request, so we render the whole page
    // TODO set a default layout for all routes or route's in the class
    const body = templateLayout({
      children: template,
    })
    return c.html(AppLayout({
      ...appLayoutProps,
      children: body,
    }))
  }
}
