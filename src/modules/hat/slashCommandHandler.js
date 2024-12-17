
import { MessageComponentTypes, ButtonStyleTypes } from "discord-interactions";
import { SendActionRowComponents, SendEphemeralMessage } from "../../interactionResponse";
// src/slashCommandHandler.js

export function handleSlashCommand(interaction) {
  const hatName = interaction.data.options[0].value;
  const itemString = interaction.data.options[1].value;
  const itemsToAdd = itemString.split(',').map(item => item.trim()).filter(item => item.length > 0);

  if (itemsToAdd.length > 25) {
    return new Response(JSON.stringify(SendEphemeralMessage("You can only add up to 25 items in a single discord command")), {
      headers: { 'Content-Type': 'application/json' },
    });
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
    style: ButtonStyleTypes.SECONDARY
  });

  buttons.push({
    type: MessageComponentTypes.BUTTON,
    custom_id: `CLOSE_HATBUTTON_${hatName}`,
    label: 'Close',
    style: ButtonStyleTypes.DANGER
  });

  return new Response(JSON.stringify(SendActionRowComponents(buttons, "")), {
    headers: { 'Content-Type': 'application/json' },
  });
}