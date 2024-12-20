import { handleSlashCommand } from './slashCommandHandler.js';

export function routeDice(interaction) {
  if (interaction.data.name === 'dice') {
    return handleSlashCommand(interaction);
  }
  return null;
}
