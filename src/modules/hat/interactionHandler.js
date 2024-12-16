import { ButtonStyleTypes } from "discord-interactions";
import { SendButtons, SendEphemeralMessage } from "../../interactionResponse";
import { SplitCustomId } from "./utils";
import { DeleteMessage } from "../../discord-api";


export async function handleRandomButtonClick(env, interaction) {
  const user = interaction.member.user.username;
  const buttons = interaction.message.components[0].components; //TODO: Only supports 5 buttons!
  const availableButtons = buttons.filter(button => button.label.includes("(") == false && button.label.includes("Random") == false);
  if (availableButtons.length == 0) {
    return new Response(JSON.stringify(SendEphemeralMessage("No more items available to pick!")), { headers: { 'Content-Type': 'application/json' }});
  }

  const clickedButton = availableButtons[Math.floor(Math.random() * availableButtons.length)];
  clickedButton.label = `${clickedButton.label} (${user})`
  clickedButton.style = ButtonStyleTypes.SUCCESS;

  try {
    await DeleteMessage(env, interaction);
    return new Response(JSON.stringify(SendButtons(buttons, "")), { headers: { 'Content-Type': 'application/json' }}) //TODO - Need to make everything use button Rows. 
  } 
  catch (error) {
    return new Response(JSON.stringify(SendError(error)), { headers: { 'Content-Type': 'application/json' }})
  }
}

export async function handleItemButtonClick(env, interaction) {
  const user = interaction.member.user.username;
  const buttonLabel = SplitCustomId(interaction.data.custom_id).item;

  const buttons = interaction.message.components[0].components; //TODO: Only supports 5 buttons!
  const clickedButtonIndex = buttons.findIndex((button => button.custom_id.includes(buttonLabel)));
  let clickedButton = buttons[clickedButtonIndex];

  if (clickedButton.label.includes ("(")) {
    clickedButton.label = `${buttonLabel}`;
    clickedButton.style = ButtonStyleTypes.PRIMARY;
  } else {
    clickedButton.label = `${buttonLabel} (${user})`;
    clickedButton.style = ButtonStyleTypes.SUCCESS;
  }

  try {
    await DeleteMessage(env, interaction);
    return new Response(JSON.stringify(SendButtons(buttons, "")), { headers: { 'Content-Type': 'application/json' }}) //TODO - Need to make everything use button Rows. 
  } 
  catch (error) {
    return new Response(JSON.stringify(SendError(error)), { headers: { 'Content-Type': 'application/json' }})
  }
}