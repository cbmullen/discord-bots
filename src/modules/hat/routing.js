import { handleSlashCommand } from './slashCommandHandler.js';
import {
  handleItemButtonClick,
  handleRandomButtonClick,
} from './interactionHandler.js';

export async function routeHat(env, interaction) {
  if (interaction.data.name === 'hat') {
    return handleSlashCommand(interaction);
  } else if (interaction.data.custom_id == null) {
    return null;
  } else if (interaction.data.custom_id.includes('RANDOM_HATBUTTON')) {
    return await handleRandomButtonClick(env, interaction);
  } else if (interaction.data.custom_id.includes('HATBUTTON')) {
    return await handleItemButtonClick(env, interaction);
  }
  return null;
}
