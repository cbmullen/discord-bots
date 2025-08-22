// src/slashCommandHandler.js
import { SendUserSelectMessage } from '../../interactionResponse.js';

// Handle the slash command and send the select menu
export function handleSlashCommand(interaction, dateTime) {
  const gameName = interaction.data.options[0].value;
  const gameMode = interaction.data.options[1].value;
  const message = `Choose players for a new game of ${gameName}`;
  const customId = `DISCORD_NEWGAME_${gameName}_${dateTime}_${gameMode}`;

  const response = SendUserSelectMessage(message, customId);
  return response;
}
