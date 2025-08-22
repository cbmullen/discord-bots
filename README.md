# Vercel worker example app

## To update discord application with new module, registration is now done on a modular basis <sandbox | production | legacy>

```
$ ./scripts/set-env.sh sandbox
$ node ./src/modules/<moduleName>/registerCommand.js
```

Then go onto the [developer applications](https://discord.com/developers/application) website find the application, OAUTH2.
In the URL generator add scopes `bot` and `applications.commands`. Add permissions `Send Messages` and `Use slash commands` (reactions to come later maybe)
Copy the URL into a browser and add the application

## To update the worker to sandbox

```
$ vercel
```

## To update the worker to production

```
$ vercel --prod
```

## To update secrets via vercel so they aren't overwritten by deployments <sbx | prd>

```
$ vercel env add DISCORD_TOKEN
$ vercel env add put DISCORD_PUBLIC_KEY
$ vercel env add put DISCORD_APPLICATION_ID
```

---

## Removing registered commands

Don't add ones you don't want. It's annoying.
But if you have, run the following

```
$ ./scripts/set-env.sh sandbox
$ npm run getCommands
```

Update the deleteCommmand.js `commandId` property and run

```
$ npm run deleteCommand
```

Then re-add the application for good measure
Go onto the [developer applications](https://discord.com/developers/application) website find the application, OAUTH2.
In the URL generator add scopes `bot` and `applicatons.commands`. Add permissons `Send Messages`, `embed links`, `Add reactions` and `Use slash commands` (reactions to come later maybe)
Copy the URL into a browser and add the application

## Project structure

Below is a basic overview of the project structure (\* = Git Ignored):

```
├── configuration*
│   ├── sandbox                         -> The .dev.vars for the sandbox application - required to register commands
│   ├── production                      -> The .dev.vars for the production application - required to register commands
├── scripts
│   ├── set-env.sh                      -> Updates the .dev.vars - required prior to registering new commands
├── src
│   ├──| modules                        -> Module Directory
│      ├──| Module A
│         ├── app.js                    -> Logic that can sit outside of the handlers
│         ├── interactionHandler.js     -> Any interactions through the module have their logic here, additional button presses etc
│         ├── registerCommand.js        -> Register your module command with discord in order for it to work. See above.
│         ├── routing.js                -> The server uses this to determine which function is being called
│         ├── slashCommandHandler.js    -> The initial slash command logic goes here
│   ├── server.js                       -> Entry point for all discord apps. Does security checking and routing of interactions
│   ├── interactions.js                 -> Shared interaction response models
│   ├── utils.js                        -> May get moved.
├── wrangler-sbx.toml*        -> Configuration for Cloudflare worker (Sandbox) (Legacy)
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

## Pre-commit checks

When you try to commit code, pre-commit checks will lint your code for errors, prettier up the javascript and run the unit tests.

## Making it prettier locally

```
npx prettier --write .
```

## Running Unit Tests locally

```
npx jest
```

## Update check

```
npx npm-check-updates -u
npm install
```
