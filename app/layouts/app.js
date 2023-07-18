import { html } from 'hono/html'

// Anything you put in the body tag here is never re-loaded, so if you need to add a nav, header or footer with data that may change, you should put this in a sub-layout component e.g. main.js
const AppLayout = (props) => html`
<html>
<head>
  <meta charset="UTF-8">
  <title>${props.title}</title>
  <meta name="description" content="${props.description}">
  <script src="https://unpkg.com/htmx.org@1.9.3" integrity="sha384-lVb3Rd/Ca0AxaoZg5sACe8FJKF0tnUgR2Kd7ehUOG5GCcROv5uBIZsOqovBAcWua" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/idiomorph/dist/idiomorph-ext.min.js"></script>
  <link rel="stylesheet" href="/app.css">
</head>
<body>
  ${props.children}
</body>
</html>
`

export default AppLayout
