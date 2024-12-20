import { handleSlashCommand } from './slashCommandHandler.js';

export function routeCoin(interaction) {
  if (
    interaction.data.name === 'cointoss' ||
    interaction.data.name === 'coinflip'
  ) {
    return handleSlashCommand(interaction);
  }
  return null;
}
