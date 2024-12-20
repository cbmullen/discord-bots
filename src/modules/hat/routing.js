import { handleSlashCommand } from './slashCommandHandler.js';
import {
  handleItemButtonClick,
  handleRandomButtonClick,
  handleCloseButtonClick,
} from './interactionHandler.js';

export async function routeHat(env, interaction) {
  if (interaction.data.name === 'hat') {
    return handleSlashCommand(interaction);
  } else if (interaction.data.custom_id == null) {
    return null;
  } else if (interaction.data.custom_id.includes('CLOSE_HATBUTTON')) {
    return handleCloseButtonClick(env, interaction);
  } else if (interaction.data.custom_id.includes('RANDOM_HATBUTTON')) {
    return handleRandomButtonClick(env, interaction);
  } else if (interaction.data.custom_id.includes('HATBUTTON')) {
    return handleItemButtonClick(env, interaction);
  }
  return null;
}
