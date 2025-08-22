// src/slashCommandHandler.js
import { SendEphemeralMessage } from '../../interactionResponse.js';

// Handle the slash command and send the select menu
export function handleSlashCommand(interaction) {
  const sides = interaction.data.options[0].value;
  const random = Math.floor(Math.random() * (sides - 0 + 1)) + 0;
  return SendEphemeralMessage(`You rolled a ${random}`);
}
