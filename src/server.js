/**
 * The core server that runs on a Cloudflare worker.
 */

import { Router } from 'itty-router';
import {
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
  verifyKey,
  ButtonStyleTypes
} from 'discord-interactions';
import { PBEM_COMMAND, DICE_COMMAND, HAT_COMMAND } from './commands.js';
import {
  SendEphemeralMessage,
  SendButtons,
  UpdateMessage,
  SendUserSelectMessage,
  SendUserOrderSelectMessage,
  SendError,
  SendMessage
} from "./interactions.js";
import {
  SplitCustomId
} from "./utils.js";

class JsonResponse extends Response {
  constructor(body, init) {
    const jsonBody = JSON.stringify(body);
    init = init || {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };
    super(jsonBody, init);
  }
}

const router = Router();
let orderedUserList = [];

/**
 * A simple :wave: hello page to verify the worker is working.
 */
router.get('/', (request, env) => {
  return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`);
});

/**
 * Main route for all requests sent from Discord.  All incoming messages will
 * include a JSON payload described here:
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
router.post('/', async (request, env) => {
  const dateTime = new Date().toDateString();

  const { isValid, interaction } = await server.verifyDiscordRequest(
    request,
    env,
  );
  if (!isValid || !interaction) {
    return new Response('Bad request signature.', { status: 401 });
  }

  if (interaction.type === InteractionType.PING) {
    // The `PING` message is used during the initial webhook handshake, and is
    // required to configure the webhook in the developer portal.
    return new JsonResponse({
      type: InteractionResponseType.PONG,
    });
  }

  // Slash command PBEM

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    // Most user commands will come as `APPLICATION_COMMAND`.
    switch (interaction.data.name.toLowerCase()) {
      case DICE_COMMAND.name.toLocaleLowerCase():{
        const sides = interaction.data.options[0].value;
        const random = Math.floor((Math.random())*(sides-0+1))+0;
        return new JsonResponse(SendEphemeralMessage(`You rolled a ${random}`))
      }
      case PBEM_COMMAND.name.toLowerCase(): {
        const gameName = interaction.data.options[0].value;
        const isSequential = interaction.data.options[1].value;
        const message = `Choose players for a new game of ${gameName}`
        const customId = `DISCORD_NEWGAME_${gameName}_${dateTime}_${isSequential}`
        return new JsonResponse(SendUserSelectMessage(message, customId, 10));
      }
      case HAT_COMMAND.name.toLowerCase(): {
        const hatName = interaction.data.options[0].value;
        const itemString = interaction.data.options[1].value;
        const itemsToAdd = itemString.split(',').map(item => item.trim()).filter(item => item.length > 0);

        const customId = `DISCORD_NEWHAT_${hatName}_${dateTime}_false`
        return CreateAndSendGenericButtonsFromList(itemsToAdd, customId, true);
      }
      default:
        return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
    }
  }

  /**
   * Handle Message requests - Mostly User Flows, button presses etc.
   **/

  if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
    const customObj = SplitCustomId(interaction.data.custom_id);

    //Who is interacting?
    const user = interaction.member.user;

  /**
   * Create Users List - fire off buttons if no ordering required
   **/

    if (customObj.header === "NEWGAME") {
      // Get the list of users selected for the game.
      const userList = [];
      const keys = Object.keys(interaction.data.resolved.users);
      // console.log(keys);
      keys.forEach((key) => {
        userList.push({
          "id": interaction.data.resolved.users[key].id,
          "username": interaction.data.resolved.users[key].username
        });
      });

      if (customObj.isSequential === "true"){
      /**
      * We need to order the results by firing off another new event Header. 
      * That event will call itself until No users remain. Then it will call create buttons
      **/
        const customId = `$DISCORD_USERSORTING_${customObj.name}_${dateTime}_${customObj.isSequential}`
        const options = userList.map(function (user) {
          return {
            label: `${user.username}`,
            value: `${user.id}`
          };
        });

        try {
          await DeleteMessage(env, interaction);
          return new JsonResponse(SendUserOrderSelectMessage("Select Player 1", customId, options))
        } 
        catch (error) {
          return new JsonResponse(SendError(error))
        }
      }

      if (customObj.isSequential === "false") {
        return CreateAndSendUserButtonsFromList(env, interaction, userList, customObj);
      }
    }

    /**
    * We need to order the results by firing off another new event Header. 
    * That event will call itself until No users remain. Then it will call create buttons
    **/

    if (customObj.header === "USERSORTING") {

      const selectedUser = interaction.data.values[0];
      const selectedUserName = interaction.message.components[0].components[0].options.find(user => user.value === selectedUser).label;

      // Store the selectedUser in an OrderedList (temp)
      orderedUserList.push({
        "id": selectedUser,
        "username": selectedUserName
      });

      //Take out the previously selectedUser from the selection
      const options = interaction.message.components[0].components[0].options.filter(item => item.value !== selectedUser)

      if (options.length > 1)
      {
        try {
          await DeleteMessage(env, interaction);
          return new JsonResponse(SendUserOrderSelectMessage(`Select Player ${orderedUserList.length + 1}`, interaction.data.custom_id, options))
        } 
        catch (error) {
          return new JsonResponse(SendError(error))
        }
      } else {
        orderedUserList.push({
          "id": options[0].value,
          "username": options[0].label
        });

        return CreateAndSendUserButtonsFromList(env, interaction, orderedUserList, customObj);
      }
    }


    /**
   * Clicking a Generic button
   **/
    if (customObj.header === "BUTTON") {
      const buttons = interaction.message.components[0].components;
      const buttonLabel = SplitCustomId(interaction.data.custom_id).uid;
      const clickedButtonIndex = buttons.findIndex((button => button.custom_id.includes(buttonLabel)));
      let clickedButton = buttons[clickedButtonIndex];

      if (customObj.uid === "RANDOM") {
        const availableButtons = buttons.filter(button => button.label.includes("(") == false && button.label.includes("Random") == false);
        if (availableButtons.length == 0) {
          return new JsonResponse(SendEphemeralMessage("No more items available to pick!"))
        }
        clickedButton = availableButtons[Math.floor(Math.random() * availableButtons.length)];
        clickedButton.label = `${clickedButton.label} (${user.username})`
        clickedButton.style = ButtonStyleTypes.SUCCESS;
      } else {
        // Process Non-random buttons
        if (clickedButton.label.includes ("(")) {
          clickedButton.label = `${buttonLabel}`;
          clickedButton.style = ButtonStyleTypes.PRIMARY;
        } else {
          clickedButton.label = `${buttonLabel} (${user.username})`;
          clickedButton.style = ButtonStyleTypes.SUCCESS;
        }
      }

      try {
        await DeleteMessage(env, interaction);
        return new JsonResponse(SendButtons(buttons, "")) //TODO - Need to make everything use button Rows. 
      } 
      catch (error) {
        return new JsonResponse(SendError(error))
      }
    }


    /**
   * Clicking a PBEM User button
   **/


    if (customObj.header === "USERBUTTON") {
      const messageComponents = interaction.message.components
      //Find the right button and update it
      const buttons = messageComponents[0].components;

      if (customObj.isSequential === "true")
      {
        const clickedButtonIndex = buttons.findIndex((button => button.custom_id.includes(SplitCustomId(interaction.data.custom_id).uid)));
        const clickedButton = buttons[clickedButtonIndex];

        for (let i = 0; i < buttons.length; i++) {
          buttons[i].label = buttons[i].label.replace("Ready", "Done");
          buttons[i].style = ButtonStyleTypes.SUCCESS;
          buttons[i].disabled = false;  
        }

        clickedButton.style = ButtonStyleTypes.PRIMARY;
        clickedButton.disabled = true;
        clickedButton.label = clickedButton.label.replace("Done", "Ready");
      }
      else
      {
        const buttonIndex = buttons.findIndex((button => button.custom_id.includes(SplitCustomId(interaction.data.custom_id).uid)));
        const userButton = buttons[buttonIndex];

        if (userButton.label.includes("Ready")) {
          userButton.label = userButton.label.replace("Ready", "Done");
          userButton.style = ButtonStyleTypes.SUCCESS;

          if (buttons.every(button => button.label.includes("Done")))
          {
            for (let i = 0; i < buttons.length; i++) {
              buttons[i].label = buttons[i].label.replace("Done", "Ready");
              buttons[i].style = ButtonStyleTypes.PRIMARY;
            }
          }
        }
        else if (userButton.label.includes("Done")) {
          userButton.label = userButton.label.replace("Done", "Ready");
          userButton.style = ButtonStyleTypes.PRIMARY;
        }
      }
      const alertMessage = CreateAlertMessage(buttons);

      try {
        await DeleteMessage(env, interaction);
        return new JsonResponse(UpdateMessage(interaction, alertMessage))
      } 
      catch (error) {
        return new JsonResponse(SendError(error))
      }
    }
  }

  console.error('Unknown Type');
  return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
});
router.all('*', () => new Response('Not Found.', { status: 404 }));

/*
* Routing over --------
*/ 

async function verifyDiscordRequest(request, env) {
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  const body = await request.text();
  const isValidRequest =
    signature &&
    timestamp &&
    verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);
  if (!isValidRequest) {
    return { isValid: false };
  }

  return {interaction: JSON.parse(body), isValid: true };
}

const server = {
  verifyDiscordRequest: verifyDiscordRequest,
  fetch: async function (request, env) {
    return router.handle(request, env);
  },
};

export default server;


/*
 * Shared Functions here
 *
 */

/**
 * Shared function for creating the buttons from a list
 **/
async function CreateAndSendGenericButtonsFromList(list, customObj, includeRandom) {
  // Map Users to Buttons from response.
  const buttons = list.map(function (item) {
    return {
      type: MessageComponentTypes.BUTTON,
      custom_id: `${item}_BUTTON_${customObj.name}_${customObj.dateTime}`,
      label: `${item}`,
      style: ButtonStyleTypes.PRIMARY,
    };
  });

  if (includeRandom){
  // Create a fixed "Random" button
    buttons.push({
      type: MessageComponentTypes.BUTTON, // Button type
      custom_id: `RANDOM_BUTTON_${customObj.name}_${customObj.dateTime}`, // Custom ID for the Cancel button
      label: 'Random', // Label on the Cancel button
      style: ButtonStyleTypes.SECONDARY // Red button style for a "Cancel" button
    });
  }

  try {
    return new JsonResponse(SendButtons(buttons, ""))
  } 
  catch (error) {
    return new JsonResponse(SendError(error))
  }
}

async function CreateAndSendUserButtonsFromList(env, interaction, list, customObj) {
  // Map Users to Buttons from response.
  const userButtons = list.map(function (user) {
    return {
      type: MessageComponentTypes.BUTTON,
      custom_id: `${user.id}_USERBUTTON_${customObj.name}_${customObj.dateTime}_${customObj.isSequential}`,
      label: `${user.username}: Ready`,
      style: ButtonStyleTypes.PRIMARY,
    };
  });

  if (customObj.isSequential === "true") { // Enable all but the current user
    userButtons[0].disabled = true;

    for (let i = 1; i < userButtons.length; i++) {
      userButtons[i].disabled = false;
      userButtons[i].label = userButtons[i].label.replace("Ready", "Done");
      userButtons[i].style = ButtonStyleTypes.SUCCESS;
    }
  }

  const message = `Playing: ${customObj.name}. (Started at: ${customObj.datetime}).`
  const alertContent = CreateAlertMessage(userButtons);
  orderedUserList = []

  try {
    await DeleteMessage(env, interaction);
    return new JsonResponse(SendButtons(userButtons, `${message}\n${alertContent}`))
  } 
  catch (error) {
    return new JsonResponse(SendError(error))
  }
}

  /**
   * Shared function for creating alert list
   **/
function CreateAlertMessage(buttons) {
  // Set Alerted User(s)
  let alertUsers = []

  // Alert All ready users.
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].label.includes("Ready")) {
      const id = SplitCustomId(buttons[i].custom_id).uid;
      alertUsers.push(id)
    }
  }

  return alertUsers.map(function (id) {
      return ` <@${id}>`
    }).toString();
}

async function DiscordRequest(env, endpoint, options) {

  const url = `https://discord.com/api/v10/` + endpoint;
  if (options.body) options.body = JSON.stringify(options.body);

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${env.DISCORD_TOKEN}`,
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

async function DeleteMessage(env, interaction) {
  const endpoint = `/channels/${interaction.message.channel_id}/messages/${interaction.message.id}`;
  return await DiscordRequest(env, endpoint, { method: 'DELETE' });
}



