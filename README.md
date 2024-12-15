# Cloudflare worker example app

## To update discord application with new commands <sandbox | production | legacy>

```
$ ./scripts/set-env.sh sandbox
$ npm run register
```

## To update the worker on Wrangler <sbx | prd>

```
$ npm run publish:sbx
```

## To update secrets via wrangler so they aren't overwritten by deployments <sbx | prd>

```
$ wrangler secret put DISCORD_TOKEN --name sbx
$ wrangler secret put DISCORD_PUBLIC_KEY --name sbx
$ wrangler secret put DISCORD_APPLICATION_ID --name sbx
```
---

## Project structure

Below is a basic overview of the project structure (* = Git Ignored):

```
├── configuration*
│   ├── sandbox                -> The .dev.vars for the sandbox application - required to register commands
│   ├── production             -> The .dev.vars for the production application - required to register commands
├── scripts
│   ├── set-env.sh            -> Updates the .dev.vars - required prior to registering new commands
├── src
│   ├── commands.js           -> JSON payloads for commands
│   ├── register.js           -> Sets up commands with the Discord API
│   ├── server.js             -> Discord app logic and routing
├── wrangler-sbx.toml*        -> Configuration for Cloudflare worker (Sandbox)
├── wrangler-prd.toml*        -> Configuration for Cloudflare worker (Production)
├── package.json
├── README.md
├── .eslintrc.json
├── .prettierignore
├── .prettierrc.json
└── .gitignore
```

## Debugging Locally

```
npm run debug
```

This will start a local server, and you can interact with it at the URL http://localhost:8787. However, to properly simulate Discord interactions, you still need to set up a public endpoint, which you can do using `ngrok`.

```
ngrok http 8787
```

Now, ngrok will provide a public URL (e.g., https://xxxxxx.ngrok.io), and you can update your Discord application to point to that endpoint.

Test Interactions: Test your Discord interactions by sending requests from Discord to your ngrok URL. Use console.log() in your code to debug the requests, or use tools like VS Code Debugger to step through your code.

Navigate to the debug application here - <https://discord.com/developers/applications>
Replace the Interactions Endpoint URL with the forwarding `https://<guid>.ngrok-free.app` address
Run commands or debug