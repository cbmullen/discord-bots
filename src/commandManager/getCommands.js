import dotenv from 'dotenv';
import process from 'node:process';
// Find all slash commands programmatically

/**
 * This file is meant to be run from the command line, and is not used by the
 * application server.  It's allowed to use node.js primitives, and only needs
 * to be run once.
 */

dotenv.config({ path: '.dev.vars' });

const token = process.env.DISCORD_TOKEN;
const applicationId = process.env.DISCORD_APPLICATION_ID;

const res = await fetch(`https://discord.com/api/v10/applications/${applicationId}/commands`, {
  method: "GET",
  headers: {
    "Authorization": `Bot ${token}`,
    "Content-Type": "application/json",
  }
});

const json = await res.json();
console.log(json);
