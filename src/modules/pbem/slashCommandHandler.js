// src/slashCommandHandler.js
import { SendUserSelectMessage } from '../../interactionResponse';

// Handle the slash command and send the select menu
export function handleSlashCommand(interaction, dateTime) {
  const gameName = interaction.data.options[0].value;
  const isConsecutive = interaction.data.options[1].value;
  const message = `Choose players for a new game of ${gameName}`;
  const customId = `DISCORD_NEWGAME_${gameName}_${dateTime}_${isConsecutive}`;

  const response = SendUserSelectMessage(message, customId);

  return new Response(JSON.stringify(response), {
    headers: { 'Content-Type': 'application/json' },
  });
}
