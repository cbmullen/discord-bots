// src/slashCommandHandler.js
import { SendEphemeralMessage } from '../../interactionResponse';

// Handle the slash command and send the select menu
export function handleSlashCommand(interaction) {
  const sides = interaction.data.options[0].value;
  const random = Math.floor(Math.random() * (sides - 0 + 1)) + 0;
  const response = SendEphemeralMessage(`You rolled a ${random}`);

  return new Response(JSON.stringify(response), {
    headers: { 'Content-Type': 'application/json' },
  });
}
