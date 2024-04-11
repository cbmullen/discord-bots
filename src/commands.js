/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 */

export const PBEM_COMMAND = {
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

