import { MessageComponentTypes, ButtonStyleTypes } from 'discord-interactions';
import {
  SendActionRowComponents,
  SendStringSelectMessage,
  SendMessage,
  flattenActionRowComponents,
} from '../../interactionResponse';
import { GetSelectedUsers, SplitCustomId, SplitMessage } from './utils';
// import { DeleteMessage } from '../../discord-api';
import { SendError } from '../../interactionResponse';

let orderedUserList = [];

export async function handlePlayerSelectConsecutive(
  env,
  interaction,
  customObj,
  dateTime,
) {
  const selectedUsersList = GetSelectedUsers(interaction);

  /**
   * We need to order the results by firing off another new event Header.
   * That event will call itself until No users remain. Then it will call create buttons
   **/
  const customId = `$DISCORD_PLAYERSORTING_${customObj.name}_${dateTime}_${customObj.mode}`;
  const options = selectedUsersList.map(function (user) {
    return {
      label: `${user.username}`,
      value: `${user.id}`,
    };
  });

  orderedUserList = [];
  let response = SendStringSelectMessage('Select Player 1', customId, options);

  try {
    // await DeleteMessage(env, interaction);
    return response;
  } catch (error) {
    response = SendError(error);
    return response;
  }
}

export async function handlePlayerSelectSimultaneous(
  env,
  interaction,
  customObj,
) {
  const selectedUsersList = GetSelectedUsers(interaction);
  return CreateAndSendUserButtonsFromList(
    env,
    interaction,
    selectedUsersList,
    customObj,
  );
}

export async function handlePlayerSorting(env, interaction, customObj) {
  const selectedUser = interaction.data.values[0];
  const selectedUserName =
    interaction.message.components[0].components[0].options.find(
      (user) => user.value === selectedUser,
    ).label;

  // Store the selectedUser in an OrderedList (temp)
  orderedUserList.push({
    id: selectedUser,
    username: selectedUserName,
  });

  //Take out the previously selectedUser from the selection
  const options =
    interaction.message.components[0].components[0].options.filter(
      (item) => item.value !== selectedUser,
    );
  let response = SendStringSelectMessage(
    `Select Player ${orderedUserList.length + 1}`,
    interaction.data.custom_id,
    options,
  );

  if (options.length > 1) {
    try {
      // await DeleteMessage(env, interaction);
      return response;
    } catch (error) {
      response = SendError(error);
      return response;
    }
  } else {
    orderedUserList.push({
      id: options[0].value,
      username: options[0].label,
    });

    return CreateAndSendUserButtonsFromList(
      env,
      interaction,
      orderedUserList,
      customObj,
    );
  }
}

export async function handleSwitchModeButtonClicking(
  env,
  interaction,
  customObj,
) {
  const message = interaction.message.content;
  const buttonClicker = interaction.member.user.username;
  const buttons = flattenActionRowComponents(interaction); // Get all the buttons

  let newMessage = '';
  if (message.includes('Simultaneous')) {
    newMessage = `Playing: ${customObj.name}. Consecutive turns`;
    const foundUserButton = buttons.find((button) =>
      button.label.includes(buttonClicker),
    );
    const userButton = foundUserButton || buttons[0];

    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].label !== 'Switch Game Mode') {
        buttons[i].label = buttons[i].label.replace('Ready', 'Done');
        buttons[i].style = ButtonStyleTypes.SUCCESS;
        buttons[i].disabled = false;
      }
    }

    userButton.style = ButtonStyleTypes.PRIMARY;
    userButton.disabled = true;
    userButton.label = userButton.label.replace('Done', 'Ready');
  }
  if (message.includes('Consecutive')) {
    newMessage = `Playing: ${customObj.name}. Simultaneous turns`;
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].label !== 'Switch Game Mode') {
        buttons[i].label = buttons[i].label.replace('Done', 'Ready');
        buttons[i].style = ButtonStyleTypes.PRIMARY;
        buttons[i].disabled = false;
      }
    }
  }

  let response = ResetMessage(
    interaction,
    newMessage,
    CreateAlertMessage(buttons),
  );

  try {
    // await DeleteMessage(env, interaction);
    return response;
  } catch (error) {
    response = SendError(error);
    return response;
  }
}

export async function handleButtonClicking(env, interaction, customObj) {
  const clickedButtonId = interaction.data.custom_id; // Which button did they click?

  const buttons = flattenActionRowComponents(interaction); // Get all the buttons
  const clickedButtonIndex = buttons.findIndex(
    (button) => button.custom_id === clickedButtonId,
  );

  if (interaction.message.content.includes('Consecutive')) {
    // A Bit of Both - Consecutive Mode -----------------------------
    const clickedButton = buttons[clickedButtonIndex];

    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].label !== 'Switch Game Mode') {
        buttons[i].label = buttons[i].label.replace('Ready', 'Done');
        buttons[i].style = ButtonStyleTypes.SUCCESS;
        buttons[i].disabled = false;
      }
    }

    clickedButton.style = ButtonStyleTypes.PRIMARY;
    clickedButton.disabled = true;
    clickedButton.label = clickedButton.label.replace('Done', 'Ready');
  } else if (interaction.message.content.includes('Simultaneous')) {
    // A Bit of Both - Simultaneous Mode -----------------------------
    const userButton = buttons[clickedButtonIndex];

    if (userButton.label.includes('Ready')) {
      userButton.label = userButton.label.replace('Ready', 'Done');
      userButton.style = ButtonStyleTypes.SUCCESS;

      if (
        buttons.every(
          (button) =>
            button.label.includes('Done') ||
            button.label === 'Switch Game Mode',
        )
      ) {
        for (let i = 0; i < buttons.length; i++) {
          if (buttons[i].label !== 'Switch Game Mode') {
            buttons[i].label = buttons[i].label.replace('Done', 'Ready');
            buttons[i].style = ButtonStyleTypes.PRIMARY;
          }
        }
      }
    } else if (userButton.label.includes('Done')) {
      userButton.label = userButton.label.replace('Done', 'Ready');
      userButton.style = ButtonStyleTypes.PRIMARY;
    }
  } else if (customObj.mode === 'consecutive') {
    // Standard Consecutive -----------------------------
    const clickedButton = buttons[clickedButtonIndex];

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].label = buttons[i].label.replace('Ready', 'Done');
      buttons[i].style = ButtonStyleTypes.SUCCESS;
      buttons[i].disabled = false;
    }

    clickedButton.style = ButtonStyleTypes.PRIMARY;
    clickedButton.disabled = true;
    clickedButton.label = clickedButton.label.replace('Done', 'Ready');
  } else if (customObj.mode === 'simultaneous') {
    // Standard Simultaneous -----------------------------
    const userButton = buttons[clickedButtonIndex];

    if (userButton.label.includes('Ready')) {
      userButton.label = userButton.label.replace('Ready', 'Done');
      userButton.style = ButtonStyleTypes.SUCCESS;

      if (buttons.every((button) => button.label.includes('Done'))) {
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].label = buttons[i].label.replace('Done', 'Ready');
          buttons[i].style = ButtonStyleTypes.PRIMARY;
        }
      }
    } else if (userButton.label.includes('Done')) {
      userButton.label = userButton.label.replace('Done', 'Ready');
      userButton.style = ButtonStyleTypes.PRIMARY;
    }
  }
  // Done. Phew. -------------------------------------

  let response = UpdateMessage(interaction, CreateAlertMessage(buttons));

  try {
    // await DeleteMessage(env, interaction);
    return response;
  } catch (error) {
    response = SendError(error);
    return response;
  }
}

// Helper Functions

async function CreateAndSendUserButtonsFromList(
  env,
  interaction,
  list,
  customObj,
) {
  // Map Users to Buttons from response.
  const userButtons = list.map(function (user) {
    return {
      type: MessageComponentTypes.BUTTON,
      custom_id: `${user.id}_PBEMBUTTON_${customObj.name}_${customObj.dateTime}_${customObj.mode}`,
      label: `${user.username}: Ready`,
      style: ButtonStyleTypes.PRIMARY,
    };
  });

  let message = '';

  if (customObj.mode === 'both') {
    userButtons.push({
      type: MessageComponentTypes.BUTTON,
      custom_id: `SWITCHMODE_PBEMBUTTON_${customObj.name}_${customObj.dateTime}_${customObj.mode}`,
      label: 'Switch Game Mode',
      style: ButtonStyleTypes.SECONDARY,
    });
    message = `Playing: ${customObj.name}. Simultaneous turns`;
  } else {
    message = `Playing: ${customObj.name}.`;
  }

  if (customObj.mode === 'consecutive') {
    // Enable all but the current user
    userButtons[0].disabled = true;

    for (let i = 1; i < userButtons.length; i++) {
      userButtons[i].disabled = false;
      userButtons[i].label = userButtons[i].label.replace('Ready', 'Done');
      userButtons[i].style = ButtonStyleTypes.SUCCESS;
    }
  }

  const alertContent = CreateAlertMessage(userButtons);

  let response = SendActionRowComponents(
    userButtons,
    `${message}\n${alertContent}`,
  );

  try {
    // await DeleteMessage(env, interaction);
    return response;
  } catch (error) {
    response = SendError(error);
    return response;
  }
}

function CreateAlertMessage(buttons) {
  let alertUsers = [];
  // Alert All ready users.
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].label.includes('Ready')) {
      const id = SplitCustomId(buttons[i].custom_id).uid;
      alertUsers.push(id);
    }
  }

  return alertUsers
    .map(function (id) {
      return ` <@${id}>`;
    })
    .toString();
}

function UpdateMessage(interaction, alertContent) {
  const requestMessage = SplitMessage(interaction.message.content);
  const newMessage = `${requestMessage.message}\n${alertContent}`;
  return SendMessage(newMessage, interaction.message.components);
}

function ResetMessage(interaction, newMessage, alertContent) {
  const resetMessage = `${newMessage}\n${alertContent}`;
  return SendMessage(resetMessage, interaction.message.components);
}
