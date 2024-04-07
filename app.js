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
  UpdateMessage
} from "./interactions.js";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
let userButtons = [];

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
    const dateTime = new Date().toLocaleDateString();

    // "pbem" command
    if (name === "pbem") {
      const gameName = req.body.data.options[0].value;
      const uid = `${gameName}_${dateTime}`;

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Choose players for a new game of ${gameName}`,
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.USER_SELECT,
                  custom_id: `DISCORD_NEWGAME_${uid}`, //Required to pass through state
                  min_values: 1,
                  max_values: 10,
                },
              ],
            },
          ],
        },
      });
    }
  }

    /**
   * Handle Message requests - Mostly User Flows, button presses etc.
   **/

  if (type === InteractionType.MESSAGE_COMPONENT) {
    // custom_id set in payload when sending message component
    const dateTime = new Date().toLocaleDateString();

    const customObj = SplitCustomId(data.custom_id);

    /**
   * Create Starter Buttons from Users List
   **/
    if (customObj.header === "NEWGAME") {
      // Get the list of users selected for the game.
      const userList = [];
      const keys = Object.keys(data.resolved.users);
      keys.forEach((key) => {
        let obj = {
          "info": data.resolved.users[key],
          "state": "Ready",
          "style": ButtonStyleTypes.PRIMARY
        }
        userList.push(obj);
      });

      // Map Users to Buttons from response.
      userButtons = userList.map(function (user) {
        return {
          type: MessageComponentTypes.BUTTON,
          custom_id: `${user.info.id}_USERBUTTON_${customObj.name}_${dateTime}`,
          label: `${user.info.username}: ${user.state}`,
          style: `${user.style}`,
        };
      });

      userButtons.push({
        type: MessageComponentTypes.BUTTON,
        custom_id: `GROUP_RESET_${customObj.name}_${dateTime}`,
        label: `Reset`,
        style: ButtonStyleTypes.SECONDARY,
      });

      const message = `Playing: ${customObj.name}. (Started at: ${customObj.datetime}).`
      await SendButtons(res, userButtons, message)
      await DeleteMessage(req)
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
        const buttonIndex = messageComponents[0].components.findIndex((button => button.custom_id.includes(userId)));
        const userButton = messageComponents[0].components[buttonIndex];

        let alertUsers = []
        if (userButton.label.includes("Ready")) {
          userButton.label = userButton.label.replace("Ready", "Done");
          userButton.style = ButtonStyleTypes.SUCCESS;

        var buttons = messageComponents[0].components;
          for (let i = 0; i < buttons.length; i++) {
            console.log(buttons[i])
            if (buttons[i].label.includes("Ready")) {
              const id = buttons[i].custom_id.substring(0, buttons[i].custom_id.indexOf("_"));
              alertUsers.push(id)
            }
          }
        }
        else if (userButton.label.includes("Done")) {
          userButton.label = userButton.label.replace("Done", "Ready");
          userButton.style = ButtonStyleTypes.PRIMARY;
        }

        const alertMessage = alertUsers.map(function (id) {
          return `<@${id}>`
        }).toString();

        return UpdateMessage(req, res, req.body.message.content, alertMessage, messageComponents)
      }
    }
    if (customObj.header === "RESET") {
      const messageComponents = req.body.message.components
      const buttons = messageComponents[0].components

      for (let i = 0; i < messageComponents[0].components.length; i++) {
        if (buttons[i].label.includes("Done")) {
          buttons[i].label = buttons[i].label.replace("Done", "Ready");
          buttons[i].style = ButtonStyleTypes.PRIMARY;
        }       
      }
      return UpdateMessage(req, res, req.body.message.content, [""], messageComponents)
    }
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
