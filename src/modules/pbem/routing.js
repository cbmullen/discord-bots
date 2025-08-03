import { handleSlashCommand } from './slashCommandHandler.js';
import {
  handlePlayerSorting,
  handlePlayerSelectConsecutive,
  handlePlayerSelectSimultaneous,
  handleButtonClicking,
  handleSwitchModeButtonClicking,
  handleDeleteButtonClicking,
} from './interactionHandler.js';
import { SplitCustomId } from './utils.js';

export async function routePBEM(env, interaction, dateTime) {
  let customObj = '';
  if (interaction.data.custom_id != null) {
    customObj = SplitCustomId(interaction.data.custom_id);
  }

  if (interaction.data.name === 'pbem') {
    return handleSlashCommand(interaction, dateTime);
  } else if (
    customObj.header === 'NEWGAME' &&
    customObj.mode === 'consecutive'
  ) {
    return handlePlayerSelectConsecutive(env, interaction, customObj, dateTime);
  } else if (
    customObj.header === 'NEWGAME' &&
    (customObj.mode === 'simultaneous' || customObj.mode === 'both')
  ) {
    return handlePlayerSelectSimultaneous(
      env,
      interaction,
      customObj,
      dateTime,
    );
  } else if (customObj.header === 'PLAYERSORTING') {
    return handlePlayerSorting(env, interaction, customObj);
  } else if (customObj.uid === 'SWITCHMODE') {
    return handleSwitchModeButtonClicking(env, interaction, customObj);
  } else if (customObj.uid === 'DELETE') {
    return handleDeleteButtonClicking(env, interaction);
  } else if (customObj.header === 'PBEMBUTTON') {
    return handleButtonClicking(env, interaction, customObj);
  }
  return null;
}
