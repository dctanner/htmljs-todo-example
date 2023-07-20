# Exampoe todo app with the html.js framework

## What is html.js

html.js is an elegent framework for hyper speed web apps.

A html.js app is server side js that returns html
to the browser. 
Every function you write in html.js is actually a jsx component (but no React), which makes html layouts and views easy to write.
When the user clicks a link or submits a form, htmx is used to turn these into ajax requests. When your app receives an ajax request it only returns the snippet of html on the page that needs updating.
If js is disabled or you're a search engine, the full html page is returned. 

html.js apps deploy almost anywhere, but are optimized for Cloudflare and Vercel. 

The foundations of html.js are built using the following excellent libraries:

- hono.dev provides a familiar express style router and jsx
- htmx.org powers ajax partial html fetching

## Todo example app

This demo is built to deploy to Cloudflare Workers and uses the Cloudflare D1 SQLite db. 

## Setup

Install wrangler:

```
npm install -g wrangler
```

Setup `wrangler.toml` file:

```
cp wrangler.toml.example wrangler.toml
```

Setup a Cloudflare D1 sqlite database:

```
wrangler d1 create htmljs-todo-example --experimental-backend
```

Copy the ouput starting `[[d1_databases]]` to the end of your `wrangler.toml` file.

Load db with schema an example data:

```
wrangler d1 execute htmljs-todo-example --local --file=./db/schema.sql
```

Install dependencies and run dev server:

```
pnpm install
pnpm run dev
# In sepate terminal run tailwindcss build watcher
pnpm run dev:css
```

```
pnpm run deploy
```
