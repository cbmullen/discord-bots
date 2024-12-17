import { handleSlashCommand } from './slashCommandHandler.js';

export async function routeMagic8Ball(interaction) {
  if (interaction.data.name === "magic8ball") {
    return handleSlashCommand(interaction); 
  }
  return null
}