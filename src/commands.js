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

export const DICE_COMMAND = {
  name: 'dice',
  description: 'Roll a dice',
  options: [
    {
      type: 4,
      name: 'sides',
      description: 'How many Sides?',
      required: true,
    },
  ],
  type: 1,
};

export const HAT_COMMAND = {
  name: 'hat',
  description: 'Pulling items from a hat',
  options: [
    {
      type: 3,
      name: 'name',
      description: 'Name your hat',
      required: true,
    },
    {
      type: 3,
      name: 'items',
      description: 'Add your items as a comma separated list',
      required: true,
    },
  ],
  type: 1,
};

