import { handleSlashCommand } from './slashCommandHandler.js';

export function routeYodaSpeak(interaction) {
  if (interaction.data.name === 'yodaspeak') {
    return handleSlashCommand(interaction);
  }
  return null;
}
