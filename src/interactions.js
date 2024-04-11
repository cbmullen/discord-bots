import {
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
} from "discord-interactions";
import {
  SplitMessage,
} from "./utils.js";

export function SendUserOrderSelectMessage(message, customId, options) {
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
              custom_id: `${customId}`,
              options: options //Required to pass through state
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

export function UpdateMessage(interaction, alertContent) {
  const requestMessage = SplitMessage(interaction.message.content);
  const newMessage = `${requestMessage.message}\n${alertContent}`
  return SendMessage(newMessage, interaction.message.components)
}

export function SendButtons(buttons, message, alertContent)
{
  return {
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
  };
}