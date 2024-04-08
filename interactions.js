import {
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
} from "discord-interactions";
import {
  DiscordRequest,
  SplitMessage,
} from "./utils.js";

export async function SendUserOrderSelectMessage(res, message, customId, options) {
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      components: [
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            {
              type: MessageComponentTypes.STRING_SELECT,
              custom_id: `${customId}`,
              options: options //Required to pass through state
            },
          ],
        },
      ],
    },
  });
}


export async function SendUserSelectMessage(res, message, customId, maxUsers) {
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      components: [
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            {
              type: MessageComponentTypes.USER_SELECT,
              custom_id: `${customId}`, //Required to pass through state
              min_values: 2,
              max_values: maxUsers,
            },
          ],
        },
      ],
    },
  });
}

export async function SendEphemeralMessage(res, message) {
  await res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      flags: InteractionResponseFlags.EPHEMERAL,
    },
  });
}

export async function SendMessage(res, message, components) {
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      components: components
    },
  });
}

export async function UpdateMessage(req, res, alertContent) {
  const requestMessage = SplitMessage(req.body.message.content);
  const newMessage = `${requestMessage.message}\n${alertContent}`
  await SendMessage(res, newMessage, req.body.message.components)
  DeleteMessage(req)
}

export async function DeleteMessage(req) {
  const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/${req.body.message.id}`;
  await DiscordRequest(endpoint, { method: 'DELETE' });
}

export async function SendButtons(res, buttons, message, alertContent)
{
  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}\n${alertContent}`,
      components: [
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: buttons
        },
      ],
    },
  });
}