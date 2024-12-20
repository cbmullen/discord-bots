// src/slashCommandHandler.js
import { SendEphemeralMessage } from '../../interactionResponse';

// Handle the slash command and send the select menu
export function handleSlashCommand(interaction) {
  const question = interaction.data.options[0].value;
  const responses = [
    'It is certain',
    'Reply hazy',
    'try again',
    'Don’t count on it',
    'It is decidedly so',
    'Ask again later',
    'My reply is no',
    'Without a doubt',
    'Better not tell you now',
    'My sources say no',
    'Yes definitely',
    'Cannot predict now',
    'Outlook not so good',
    'You may rely on it',
    'Concentrate and ask again',
    'Very doubtful',
    'As I see it, yes',
    'Most likely',
    'Outlook good',
    'Yes',
    'Signs point to yes',
  ];

  const randomIndex = Math.floor(Math.random() * responses.length);
  const response = responses[randomIndex];

  return new Response(
    JSON.stringify(SendEphemeralMessage(`_${question}_ ... **${response}**`)),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
