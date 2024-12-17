import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';
import { Router } from 'itty-router';
import { routeHat } from './modules/hat/routing';
import { routeDice } from './modules/dice/routing';
import { routePBEM } from './modules/pbem/routing';

const router = Router();

/**
 * A simple :wave: hello page to verify the worker is working.
 */
router.get('/', (request, env) => {
  return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`);
});

/**
 * All Interactions come in as posts. This validates the post then spits out the interaction object.
 */
router.post('/', async (request, env) => {
  const dateTime = new Date().toDateString();

  //security
  const { isValid, interaction } = await server.verifyDiscordRequest(
    request,
    env,
  );
  if (!isValid || !interaction) {
    console.log("???")
    return new Response('Bad request signature.', { status: 401 });
  }

  // Interactions
  if (interaction.type === InteractionType.PING) {
    const response = {
      type: InteractionResponseType.PONG,
    };
    return new Response(JSON.stringify(response), {
      headers: { 'content-type': 'application/json;charset=UTF-8' },
    });
  }

  // Route the other Interactions via their module. The router returns null if it's the wrong module. Pass env if you want to delete stuff!
  // Bear in mind, each router has to take into account what may be passed lower. See hat routing when dice has no custom_id
  let response = null;
  if (response === null) { response = await routePBEM(env, interaction, dateTime)}
  if (response === null) { response = await routeHat(env, interaction)}
  if (response === null) { response = await routeDice(interaction)}
  return response
});

// Catch anything not caught by interactions.
router.all('*', () => new Response('Not Found.', { status: 404 }));


/**
 * The security checking code. Don't touch.
 */
async function verifyDiscordRequest(request, env) {
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  const body = await request.text();
  const isValidRequest =
    signature &&
    timestamp &&
    verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);
  if (!isValidRequest) {
    return { isValid: false };
  }

  return {interaction: JSON.parse(body), isValid: true };
}

const server = {
  verifyDiscordRequest: verifyDiscordRequest,
  fetch: async function (request, env) {
    return router.handle(request, env);
  },
};

export default server;
