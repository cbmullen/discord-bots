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

const body = {
  name: 'pbem',
  description: 'Play by email helper',
  options: [
    {
      type: 3,
      name: 'name',
      description: 'Name your game',
      required: true,
    },
    {
      type: 5,
      name: 'isconsecutive',
      description: 'Are the turns resolved consecutively or simultaneously?',
      required: true,
    },
  ],
  type: 1,
};

const res = await fetch(
  `https://discord.com/api/v10/applications/${applicationId}/commands`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bot ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  },
);

const json = await res.json();
console.log(json);
