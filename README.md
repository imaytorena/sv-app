## Developing

Once you've created a project and installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev --host --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

## Wrangler locally

To run wrangler config locally:

```bash
npm install -g wrangler
```

After installing run wrangler on local

```bash
npx wrangler pages dev .svelte-kit/cloudflare
```

You can preview the production build with `npm run preview`.
