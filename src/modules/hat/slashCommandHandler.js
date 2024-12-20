import { MessageComponentTypes, ButtonStyleTypes } from 'discord-interactions';
import {
  SendActionRowComponents,
  SendEphemeralMessage,
} from '../../interactionResponse';
// src/slashCommandHandler.js

export function handleSlashCommand(interaction) {
  const hatName = interaction.data.options[0].value;
  const itemString = interaction.data.options[1].value;
  const itemsToAdd = itemString
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  if (itemsToAdd.length < 2) {
    return SendEphemeralMessage(
      'You need to add more than 1 item. Make sure to use a comma separated list',
    );
  }

  if (itemsToAdd.length > 23) {
    return SendEphemeralMessage(
      'You can only add up to 25 buttons in a single discord command',
    );
  }

  const buttons = itemsToAdd.map(function (item) {
    return {
      type: MessageComponentTypes.BUTTON,
      custom_id: `${item}_HATBUTTON_${hatName}`,
      label: `${item}`,
      style: ButtonStyleTypes.PRIMARY,
    };
  });

  buttons.push({
    type: MessageComponentTypes.BUTTON,
    custom_id: `RANDOM_HATBUTTON_${hatName}`,
    label: 'Random',
    style: ButtonStyleTypes.SECONDARY,
  });

  return SendActionRowComponents(buttons, '');
}
