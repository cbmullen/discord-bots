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
