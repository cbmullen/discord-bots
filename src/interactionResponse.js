import {
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
} from 'discord-interactions';

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
              options: options,
            },
          ],
        },
      ],
    },
  };
}

export function SendUserSelectMessage(message, customId) {
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
              max_values: 20, // Max components is 25, but leave space for cancel buttons / random buttons etc
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
      components: components,
    },
  };
}

export function SendError(error) {
  return SendMessage(`I died... ${error}`, []);
}

/*
 * Needed because action rows only allow 5 components per row, each row is it's own array
 * [[1,2,3,4,5], [6,7,8,9,0]]. Makes it harder to parse, query or return the whole collection back.
 */

export function flattenActionRowComponents(interaction) {
  const actionRows = interaction.message.components;
  let rowComponents = [];
  let flatComponents = [];
  for (let i = 0; i < actionRows.length; i++) {
    // Up to 5 action rows (i)
    rowComponents = actionRows[i].components;
    for (let j = 0; j < rowComponents.length; j++) {
      // Up to 5 components (j) per row
      flatComponents.push(rowComponents[j]);
    }
  }
  return flatComponents;
}

/*
 * Takes into account the fact that you need to take your full list of components and arrange them into action rows with 5 components each
 */

export function SendActionRowComponents(components, content) {
  let tempArr = [];
  const componentsPerRow = 5;
  const rows = [];

  for (let i = 0; i < components.length; i++) {
    tempArr.push(components[i]); // Add components to build up a row
    if (tempArr.length === componentsPerRow || i === components.length - 1) {
      // If components = 5 or no more components, add a row.
      rows.push({
        type: MessageComponentTypes.ACTION_ROW,
        components: tempArr,
      });
      tempArr = []; // Reset for the next row
    }
  }

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: content,
      components: rows,
    },
  };
}
