// server.test.js
import { handleRequest } from '../../server';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
} from 'discord-interactions';

// Mock the global fetch function used in Workers
global.fetch = jest.fn();

describe('Dice Slash Handler', () => {
  beforeEach(() => {
    // Clear any mock calls before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    Math.random.mockRestore();
  });

  it('should handle /dice correctly', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    // Simulate a Discord interaction for the /ping command
    const interaction = {
      type: InteractionType.App,
      data: {
        name: 'dice',
        options: [
          {
            name: 'sides',
            type: 4,
            value: 5,
          },
        ],
      },
      id: 'interaction_id',
      token: 'interaction_token',
    };

    const env = {};
    const response = await handleRequest(interaction, env);
    expect(response.type).toEqual(
      InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    );
    expect(response.data.flags).toEqual(InteractionResponseFlags.EPHEMERAL);
    expect(response.data.content).toContain('You rolled a 3');
  });
});
