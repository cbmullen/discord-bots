import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';
import { Router } from 'itty-router';
import { routeHat } from './modules/hat/routing';
import { routeDice } from './modules/dice/routing';
import { routePBEM } from './modules/pbem/routing';
import { routeCoin } from './modules/cointoss/routing';
import { routeMagic8Ball } from './modules/magic8ball/routing';

const router = Router();

/**
 * Routing
 */
router.get('/', (request, env) => {
  return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`);
});

/**
 * All Interactions come in as posts. This validates the post then spits out the interaction object.
 */
router.post('/', async (request, env) => {
  // Run verification First.
  const { isValid, interaction } = await server.verifyDiscordRequest(
    request,
    env,
  );
  if (!isValid || !interaction) {
    return new Response('Bad request signature.', { status: 401 });
  }

  // Unit Test this.
  const response = await handleRequest(interaction, env);

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'DiscordBot (https://prd.cbmullen.workers.dev/, 1.0.0)',
    },
  });
});

// Catch anything not caught by interactions.
router.all('*', () => new Response('Not Found.', { status: 404 }));

/**
 * Break out the request handler to allow for unit testing
 */

export async function handleRequest(interaction, env) {
  const dateTime = new Date().toDateString();
  // Interactions
  if (interaction.type === InteractionType.PING) {
    const response = {
      type: InteractionResponseType.PONG,
    };
    return response;
  }

  // Route the other Interactions via their module. The router returns null if it's the wrong module. Pass env if you want to delete stuff!
  // Bear in mind, each router has to take into account what may be passed lower. See hat routing when dice has no custom_id
  let response = null;
  if (response === null) {
    response = await routePBEM(env, interaction, dateTime);
  }
  if (response === null) {
    response = await routeHat(env, interaction);
  }
  if (response === null) {
    response = routeDice(interaction);
  }
  if (response === null) {
    response = routeCoin(interaction);
  }
  if (response === null) {
    response = routeMagic8Ball(interaction);
  }
  return response;
}

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
    (await verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY));
  if (!isValidRequest) {
    return { isValid: false };
  }

  return { interaction: JSON.parse(body), isValid: true };
}

const server = {
  verifyDiscordRequest: verifyDiscordRequest,
  fetch: async function (request, env) {
    return router.fetch(request, env);
  },
};

export default server;
