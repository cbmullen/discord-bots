import {
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
} from "discord-interactions";
import {
  DiscordRequest,
} from "./utils.js";

export async function SendEphemeralMessage(res, message) {
  await res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      flags: InteractionResponseFlags.EPHEMERAL,
    },
  });
}

export async function UpdateMessage(res, message, components) {
  await res.send({
    type: InteractionResponseType.UPDATE_MESSAGE,
    data: {
      content: `${message}`,
      components: components
    },
  });
}

export async function DeleteMessage(req) {
  const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/${req.body.message.id}`;
  await DiscordRequest(endpoint, { method: 'DELETE' });
}

export async function SendButtons(res, buttons, message)
{
  await res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      components: [
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: buttons
        },
      ],
    },
  });
}