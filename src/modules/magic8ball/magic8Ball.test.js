import { handleRequest } from '../../server';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
} from 'discord-interactions';

global.fetch = jest.fn();

describe('Magic8Ball Slash Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    Math.random.mockRestore();
  });

  it('should handle /magic8ball correctly', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const interaction = {
      type: InteractionType.App,
      data: {
        name: 'magic8ball',
        options: [
          {
            name: 'question',
            type: 3,
            value: 'Am I going to watch firefly later',
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
      '_Am I going to watch firefly later_ ... **Yes definitely**',
    );
  });
});
