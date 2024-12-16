import { handleSlashCommand } from './slashCommandHandler.js';
import { handlePlayerSorting, handlePlayerSelectSequential, handlePlayerSelectSimultaneous, handleButtonClicking } from './interactionHandler.js';
import { SplitCustomId } from './utils.js';

export async function routePBEM(env, interaction, dateTime) {
  let customObj = "";
  if (interaction.data.custom_id != null) {
    customObj = SplitCustomId(interaction.data.custom_id);
  }

  if (interaction.data.name === "pbem") {
    return handleSlashCommand(interaction, dateTime);
  }
  else if (customObj.header === "NEWGAME" && customObj.isSequential === "true") {
    return handlePlayerSelectSequential(env, interaction, customObj, dateTime)
  }
  else if (customObj.header === "NEWGAME" && customObj.isSequential === "false") {
    return handlePlayerSelectSimultaneous(env, interaction, customObj)
  }
  else if (customObj.header === "PLAYERSORTING") {
    return handlePlayerSorting(env, interaction, customObj)
  }
  else if (customObj.header === "USERBUTTON") {
    return handleButtonClicking(env, interaction, customObj)
  }
  return null
}