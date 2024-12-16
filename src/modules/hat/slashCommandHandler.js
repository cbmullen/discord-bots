
import { MessageComponentTypes, ButtonStyleTypes } from "discord-interactions";
import { SendButtons } from "../../interactionResponse";
// src/slashCommandHandler.js

export function handleSlashCommand(interaction) {
  const hatName = interaction.data.options[0].value;
  const itemString = interaction.data.options[1].value;
  const itemsToAdd = itemString.split(',').map(item => item.trim()).filter(item => item.length > 0);

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

  return new Response(JSON.stringify(SendButtons(buttons, "")), {
    headers: { 'Content-Type': 'application/json' },
  });
}