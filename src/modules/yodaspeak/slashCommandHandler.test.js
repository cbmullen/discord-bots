import { handleRequest } from '../../server.js';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
} from 'discord-interactions';

global.fetch = jest.fn();

describe('YodaSpeak Slash Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    Math.random.mockRestore();
    jest.clearAllMocks();
  });

  it('should handle /yodaspeak correctly', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const interaction = {
      type: InteractionType.App,
      data: {
        name: 'yodaspeak',
        options: [
          {
            name: 'sentence',
            type: 3,
            value: 'I am going to watch firefly later',
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
    expect(response.data.content).toContain(
      '**to watch firefly later, I am going.**',
    );
  });

  it('should handle /yodaspeak correctly with random', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.1);
    const interaction = {
      type: InteractionType.App,
      data: {
        name: 'yodaspeak',
        options: [
          {
            name: 'sentence',
            type: 3,
            value: 'I am going to watch firefly later',
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
    expect(response.data.content).toContain(
      '**Hmm, to watch firefly later, I am going.**',
    );
  });
});
