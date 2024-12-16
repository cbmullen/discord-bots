import {
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
} from "discord-interactions";

export function SendStringSelectMessage(message, customId, options) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      components: [
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            {
              type: MessageComponentTypes.STRING_SELECT,
              custom_id: `${customId}`, //Required to pass through state
              options: options 
            },
          ],
        },
      ],
    },
  };
}

export function SendUserSelectMessage(message, customId, maxUsers) {
  return {
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
  };
}

export function SendEphemeralMessage(message) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      flags: InteractionResponseFlags.EPHEMERAL,
    },
  };
}

export function SendMessage(message, components) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `${message}`,
      components: components
    },
  };
}

export function SendError(error) {
  return SendMessage(`I died... ${error}`, [])
}

export function SendButtons(buttons, content)
{
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: content,
      components: [
        {
          type: MessageComponentTypes.ACTION_ROW,
          components: buttons
        },
      ],
    },
  };
}
