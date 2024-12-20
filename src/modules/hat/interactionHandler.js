import { ButtonStyleTypes } from 'discord-interactions';
import {
  SendActionRowComponents,
  SendEphemeralMessage,
  flattenActionRowComponents,
} from '../../interactionResponse';
import { SplitCustomId } from './utils';
import { DeleteMessage } from '../../discord-api';
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
    await DeleteMessage(env, interaction);
    return new Response(JSON.stringify(SendActionRowComponents(buttons, '')), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify(SendError(error)), {
      headers: { 'Content-Type': 'application/json' },
    });
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
    return new Response(
      JSON.stringify(SendEphemeralMessage('No more items available to pick!')),
      { headers: { 'Content-Type': 'application/json' } },
    );
  }
  const clickedButton =
    availableButtons[Math.floor(Math.random() * availableButtons.length)]; //Select a button from available.

  clickedButton.label = `${clickedButton.label} (${user})`;
  clickedButton.style = ButtonStyleTypes.SUCCESS;

  try {
    await DeleteMessage(env, interaction);
    return new Response(JSON.stringify(SendActionRowComponents(buttons, '')), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify(SendError(error)), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function handleCloseButtonClick(env, interaction) {
  await DeleteMessage(env, interaction);
}
