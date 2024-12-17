import dotenv from 'dotenv';
import process from 'node:process';
// Register a slash command programmatically

/**
 * This file is meant to be run from the command line, and is not used by the
 * application server.  It's allowed to use node.js primitives, and only needs
 * to be run once.
 */

dotenv.config({ path: '.dev.vars' });

const token = process.env.DISCORD_TOKEN;
const applicationId = process.env.DISCORD_APPLICATION_ID;

/*
 * For the tossers
 */

const coinTossBody = {
  name: 'cointoss',
  description: 'Heads or Tails? A coin toss!',
  options: [],
  type: 1,
};

const coinToss = await fetch(`https://discord.com/api/v10/applications/${applicationId}/commands`, {
  method: "POST",
  headers: {
    "Authorization": `Bot ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(coinTossBody),
});

const toss = await coinToss.json();
console.log(toss);

/*
 * For the flippers
 */
const coinFlipBody = {
  name: 'coinflip',
  description: 'Heads or Tails? A coin flip!',
  options: [],
  type: 1,
};

const coinFlip = await fetch(`https://discord.com/api/v10/applications/${applicationId}/commands`, {
  method: "POST",
  headers: {
    "Authorization": `Bot ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(coinFlipBody),
});

const flip = await coinFlip.json();
console.log(flip);
