import { html } from 'hono/html'

const AppLayout = (props) => html`
<html>
<head>
  <meta charset="UTF-8">
  <title>${props.title}</title>
  <meta name="description" content="${props.description}">
</head>
<body>
  ${props.children}
</body>
</html>
`

export default AppLayout
