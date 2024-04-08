import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  MessageComponentTypes,
  ButtonStyleTypes,
} from "discord-interactions";
import {
  VerifyDiscordRequest,
  SplitCustomId
} from "./utils.js";
import {
  DeleteMessage,
  SendEphemeralMessage,
  SendButtons,
  UpdateMessage,
  SendUserSelectMessage,
  SendUserOrderSelectMessage
} from "./interactions.js";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
let orderedUserList = [];
const dateTime = new Date().toDateString();


/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "pbem" command
    if (name === "pbem") {

      //Getting all the params passed into the new game creation
      const gameName = req.body.data.options[0].value;
      const isSequential = req.body.data.options[1].value;
      const message = `Choose players for a new game of ${gameName}`
      const customId = `DISCORD_NEWGAME_${gameName}_${dateTime}_${isSequential}`
      return SendUserSelectMessage(res, message, customId, 10);
    }
  }

    /**
   * Handle Message requests - Mostly User Flows, button presses etc.
   **/

  if (type === InteractionType.MESSAGE_COMPONENT) {
    const customObj = SplitCustomId(data.custom_id);

    /**
   * Create Users List - fire off buttons if no ordering required
   **/
    if (customObj.header === "NEWGAME") {
      // Get the list of users selected for the game.
      const userList = [];
      const keys = Object.keys(data.resolved.users);
      // console.log(keys);
      keys.forEach((key) => {
        userList.push({
          "id": data.resolved.users[key].id,
          "username": data.resolved.users[key].username
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

        SendUserOrderSelectMessage(res, "Select Player 1", customId, options)
        await DeleteMessage(req)
      }
      if (customObj.isSequential === "false") {
        CreateAndSendButtonsFromList(userList, customObj);
      }
    }

    /**
    * We need to order the results by firing off another new event Header. 
    * That event will call itself until No users remain. Then it will call create buttons
    **/

    if (customObj.header === "USERSORTING") {
      const selectedUser = req.body.data.values[0];
      const selectedUserName = req.body.message.components[0].components[0].options.find(user => user.value === selectedUser).label;

      // Store the selectedUser in an OrderedList (temp)
      orderedUserList.push({
        "id": selectedUser,
        "username": selectedUserName
      });

      //Take out the previously selectedUser from the selection
      const options = req.body.message.components[0].components[0].options.filter(item => item.value !== selectedUser)

      if (options.length > 1)
      {
        SendUserOrderSelectMessage(res, `Select Player ${orderedUserList.length + 1}`, req.body.data.custom_id, options)
        await DeleteMessage(req)
      } else {
        orderedUserList.push({
          "id": options[0].value,
          "username": options[0].label
        });

        CreateAndSendButtonsFromList(orderedUserList, customObj);
        orderedUserList = []
      }
    }
    /**
   * Clicking a button
   **/
    // user who interacted
    const userId = req.body.member.user.id;

    if (customObj.header === "USERBUTTON") {
      if (customObj.owner !== userId) {
        return SendEphemeralMessage(res, "That's not your button!");
      }

      if (customObj.owner === userId) {
        const messageComponents = req.body.message.components

        //Find the right button and update it
        const buttons = messageComponents[0].components;
        const buttonIndex = messageComponents[0].components.findIndex((button => button.custom_id.includes(userId)));

        const userButton = buttons[buttonIndex];

        userButton.label = userButton.label.replace("Ready", "Done");
        userButton.style = ButtonStyleTypes.SUCCESS;
        userButton.disabled = true;

        // Will only apply to sequential
        if (customObj.isSequential === "true") {
          let nextIdx = buttonIndex + 1
          if (nextIdx === buttons.length) // wraparound
            nextIdx = 0
          
          const nextUserButton = buttons[nextIdx];
          nextUserButton.label = nextUserButton.label.replace("Done", "Ready");
          nextUserButton.style = ButtonStyleTypes.PRIMARY;
          nextUserButton.disabled = false;
        }

        // Will only ever apply to simultaneous
        if (buttons.every(button => button.disabled === true))
        {
          for (let i = 0; i < buttons.length; i++) {
            buttons[i].label = buttons[i].label.replace("Done", "Ready");
            buttons[i].style = ButtonStyleTypes.PRIMARY;
            buttons[i].disabled = false;  
          }
        }

        const alertMessage = CreateAlertMessage(buttons);
        return UpdateMessage(req, res, alertMessage)
      }
    }
  }
    /**
   * Shared function for creating the buttons from a list
   **/
    async function CreateAndSendButtonsFromList(list, customObj) {
      // Map Users to Buttons from response.
      const userButtons = list.map(function (user) {
        return {
          type: MessageComponentTypes.BUTTON,
          custom_id: `${user.id}_USERBUTTON_${customObj.name}_${customObj.dateTime}_${customObj.isSequential}`,
          label: `${user.username}: Ready`,
          style: ButtonStyleTypes.PRIMARY,
        };
      });

      if (customObj.isSequential === "true") // Disable all but the current user
        for (let i = 1; i < userButtons.length; i++) {
          userButtons[i].disabled = true;
          userButtons[i].label = userButtons[i].label.replace("Ready", "Done");
          userButtons[i].style = ButtonStyleTypes.SUCCESS;
        }

      const message = `Playing: ${customObj.name}. (Started at: ${customObj.datetime}).`
      const alertContent = CreateAlertMessage(userButtons);
      await SendButtons(res, userButtons, message, alertContent)
      await DeleteMessage(req)
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
        const id = SplitCustomId(buttons[i].custom_id).owner;
        alertUsers.push(id)
      }
    }

    return alertUsers.map(function (id) {
        return ` <@${id}>`
      }).toString();
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
