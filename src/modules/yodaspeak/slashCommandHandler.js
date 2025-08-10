// src/slashCommandHandler.js
import { SendEphemeralMessage } from '../../interactionResponse';

// Handle the slash command and send the select menu
export function handleSlashCommand(interaction) {
  const sentence = interaction.data.options[0].value;
  const response = yodaSpeak(sentence);
  return SendEphemeralMessage(`**${response}**`);
}

function yodaSpeak(sentence) {
  // Clean the sentence and remove ending punctuation
  const cleaned = sentence.trim().replace(/[.!?]+$/, '');

  // Basic grammar parsing (simplified)
  const matches = cleaned.match(
    /^(.*?)\s+((?:am|is|are|was|were|will|have|has|had)\s+.*?)\s+(to\s+.*|.*?)$/i,
  );

  if (!matches) {
    // Fallback for simple sentences
    const words = cleaned.split(' ');
    return words.reverse().join(' ') + '.';
  }

  // Extract parts: subject, verb phrase, object
  // eslint-disable-next-line no-unused-vars
  const [_, subject, verbPhrase, object] = matches;

  // Arrange in Yoda's OSV pattern
  // Sometimes he adds emphasis words
  const emphasisWords = ['Hmm, ', 'Yes, ', 'Indeed, '];
  const emphasis =
    Math.random() < 0.3
      ? emphasisWords[Math.floor(Math.random() * emphasisWords.length)]
      : '';

  return `${emphasis}${object}, ${subject} ${verbPhrase}.`;
}
