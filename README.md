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
wrangler d1 create htmly-todo-example --experimental-backend
```

Copy the ouput starting `[[d1_databases]]` to the end of your `wrangler.toml` file.

Load db with schema an example data:

```
wrangler d1 execute htmly-todo-example --local --file=./db/schema.sql
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
