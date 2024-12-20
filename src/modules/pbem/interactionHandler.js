import { MessageComponentTypes, ButtonStyleTypes } from 'discord-interactions';
import {
  SendActionRowComponents,
  SendStringSelectMessage,
  SendMessage,
  flattenActionRowComponents,
} from '../../interactionResponse';
import { GetSelectedUsers, SplitCustomId, SplitMessage } from './utils';
import { DeleteMessage } from '../../discord-api';
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
  const customId = `$DISCORD_PLAYERSORTING_${customObj.name}_${dateTime}_${customObj.isConsecutive}`;
  const options = selectedUsersList.map(function (user) {
    return {
      label: `${user.username}`,
      value: `${user.id}`,
    };
  });

  orderedUserList = [];
  let response = SendStringSelectMessage('Select Player 1', customId, options);

  try {
    await DeleteMessage(env, interaction);
    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    response = SendError(error);
    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
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
      await DeleteMessage(env, interaction);
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      response = SendError(error);
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' },
      });
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

export async function handleButtonClicking(env, interaction, customObj) {
  const clickedButtonId = interaction.data.custom_id; // Which button did they click?

  const buttons = flattenActionRowComponents(interaction); // Get all the buttons
  const clickedButtonIndex = buttons.findIndex(
    (button) => button.custom_id === clickedButtonId,
  );

  if (customObj.isConsecutive === 'true') {
    const clickedButton = buttons[clickedButtonIndex];

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].label = buttons[i].label.replace('Ready', 'Done');
      buttons[i].style = ButtonStyleTypes.SUCCESS;
      buttons[i].disabled = false;
    }

    clickedButton.style = ButtonStyleTypes.PRIMARY;
    clickedButton.disabled = true;
    clickedButton.label = clickedButton.label.replace('Done', 'Ready');
  } else {
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

  let response = UpdateMessage(interaction, CreateAlertMessage(buttons));

  try {
    await DeleteMessage(env, interaction);
    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    response = SendError(error);
    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
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
      custom_id: `${user.id}_PBEMBUTTON_${customObj.name}_${customObj.dateTime}_${customObj.isConsecutive}`,
      label: `${user.username}: Ready`,
      style: ButtonStyleTypes.PRIMARY,
    };
  });

  if (customObj.isConsecutive === 'true') {
    // Enable all but the current user
    userButtons[0].disabled = true;

    for (let i = 1; i < userButtons.length; i++) {
      userButtons[i].disabled = false;
      userButtons[i].label = userButtons[i].label.replace('Ready', 'Done');
      userButtons[i].style = ButtonStyleTypes.SUCCESS;
    }
  }

  const message = `Playing: ${customObj.name}. (Started at: ${customObj.datetime}).`;
  const alertContent = CreateAlertMessage(userButtons);

  let response = SendActionRowComponents(
    userButtons,
    `${message}\n${alertContent}`,
  );

  try {
    await DeleteMessage(env, interaction);
    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    response = SendError(error);
    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
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
