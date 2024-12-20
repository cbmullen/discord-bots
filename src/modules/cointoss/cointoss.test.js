// server.test.js
import { handleRequest } from '../../server';
import { InteractionType, InteractionResponseType } from 'discord-interactions';

describe('Cointoss Slash Handler', () => {
  beforeEach(() => {
    // Clear any mock calls before each test
    jest.clearAllMocks();
  });

  it('should handle /cointoss correctly', async () => {
    // Simulate a Discord interaction for the /ping command
    const interaction = {
      type: InteractionType.App,
      data: {
        name: 'cointoss',
      },
      member: {
        user: {
          username: 'Jayne Cobb',
        },
      },
      id: 'interaction_id',
      token: 'interaction_token',
    };

    const env = {};
    const response = await handleRequest(interaction, env);
    expect(response.type).toEqual(
      InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    );
    expect(response.data.components).toEqual([]);
    expect(response.data.content).toContain(
      'Jayne Cobb tossed a coin and it landed on',
    );
    expect(response.data.content).toMatch(/(Heads!|Tails!)/);
  });

  it('should handle /coinflip correctly', async () => {
    // Simulate a Discord interaction for the /ping command
    const interaction = {
      type: InteractionType.App,
      data: {
        name: 'coinflip',
      },
      member: {
        user: {
          username: 'Mal Reynolds',
        },
      },
      id: 'interaction_id',
      token: 'interaction_token',
    };

    const env = {};
    const response = await handleRequest(interaction, env);
    expect(response.type).toEqual(
      InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    );
    expect(response.data.components).toEqual([]);
    expect(response.data.content).toContain(
      'Mal Reynolds flipped a coin and it landed on',
    );
    expect(response.data.content).toMatch(/(Heads!|Tails!)/);
  });
});
