import { handleSlashCommand } from './slashCommandHandler.js';

export async function routeDice(interaction) {
  if (interaction.data.name === 'dice') {
    return handleSlashCommand(interaction);
  }
  return null;
}
