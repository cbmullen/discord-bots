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
const commandId = '_placeholder_';

await fetch(
  `https://discord.com/api/v10/applications/${applicationId}/commands/${commandId}`,
  {
    method: 'DELETE',
    headers: {
      Authorization: `Bot ${token}`,
      'Content-Type': 'application/json',
    },
  },
);
