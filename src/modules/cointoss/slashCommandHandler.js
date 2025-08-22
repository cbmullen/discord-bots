// src/slashCommandHandler.js
import { SendMessage } from '../../interactionResponse.js';

// Handle the slash command and send the select menu
export function handleSlashCommand(interaction) {
  const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
  let verb = '';

  // For the tossers
  if (interaction.data.name === 'cointoss') verb = 'tossed';

  // For the flippers
  if (interaction.data.name === 'coinflip') verb = 'flipped';

  const user = interaction.member.user.username;
  return SendMessage(`${user} ${verb} a coin and it landed on ${result}!`, []);
}
