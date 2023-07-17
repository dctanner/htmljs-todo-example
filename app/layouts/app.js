import { html } from 'hono/html'

const AppLayout = (props) => html`
<html>
<head>
  <meta charset="UTF-8">
  <title>${props.title}</title>
  <meta name="description" content="${props.description}">
  <style type="text/css">

  </style>
</head>
<body>
  ${props.children}
</body>
</html>
`

export default AppLayout
