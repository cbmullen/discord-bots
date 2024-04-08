import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

// Simple PBEM command
const PBEM_COMMAND = {
  name: 'pbem',
  description: 'Basic command',
  options: [
    {
      type: 3,
      name: 'name',
      description: 'Name your game',
      required: true,
    },
    {
      type: 5,
      name: 'issequential',
      description: 'Clicking done alerts the next person in the game',
      required: true,
    },
  ],
  type: 1,
};

const ALL_COMMANDS = [PBEM_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);