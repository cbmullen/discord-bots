import { ButtonStyleTypes } from 'discord-interactions';
import {
  SendActionRowComponents,
  SendEphemeralMessage,
  flattenActionRowComponents,
} from '../../interactionResponse';
import { SplitCustomId } from './utils';
// import { DeleteMessage } from '../../discord-api';
import { SendError } from '../../interactionResponse';

export async function handleItemButtonClick(env, interaction) {
  const user = interaction.member.user.username; // Who clicked a button?
  const clickedButtonId = interaction.data.custom_id; // Which button did they click?
  const clickedButtonLabel = SplitCustomId(clickedButtonId).item; // What was it's original label?

  const buttons = flattenActionRowComponents(interaction); // Get all the buttons
  const clickedButtonIndex = buttons.findIndex(
    (button) => button.custom_id === clickedButtonId,
  );
  const clickedButton = buttons[clickedButtonIndex];

  if (clickedButton.label.includes('(')) {
    clickedButton.label = `${clickedButtonLabel}`;
    clickedButton.style = ButtonStyleTypes.PRIMARY;
  } else {
    clickedButton.label = `${clickedButtonLabel} (${user})`;
    clickedButton.style = ButtonStyleTypes.SUCCESS;
  }

  try {
    // await DeleteMessage(env, interaction);
    return SendActionRowComponents(buttons, interaction.message.content);
  } catch (error) {
    return SendError(error);
  }
}

export async function handleRandomButtonClick(env, interaction) {
  const user = interaction.member.user.username; // Who clicked a button
  const buttons = flattenActionRowComponents(interaction); // Get all the buttons

  const availableButtons = buttons.filter(
    (button) =>
      button.label.includes('(') == false &&
      button.label.includes('Random') == false,
  );
  if (availableButtons.length == 0) {
    return SendEphemeralMessage('No more items available to pick!');
  }
  const clickedButton =
    availableButtons[Math.floor(Math.random() * availableButtons.length)]; //Select a button from available.

  clickedButton.label = `${clickedButton.label} (${user})`;
  clickedButton.style = ButtonStyleTypes.SUCCESS;

  try {
    // await DeleteMessage(env, interaction);
    return SendActionRowComponents(buttons, interaction.message.content);
  } catch (error) {
    return SendError(error);
  }
}
