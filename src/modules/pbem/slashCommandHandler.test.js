import { handleRequest } from '../../server';
import {
  InteractionType,
  InteractionResponseType,
  MessageComponentTypes,
} from 'discord-interactions';

global.fetch = jest.fn();

describe('Play by Email Slash Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle /pbem correctly - simultaneous', async () => {
    const interaction = {
      type: InteractionType.APPLICATION_COMMAND,
      data: {
        name: 'pbem',
        options: [
          {
            name: 'name',
            type: 3,
            value: 'hungry hungry hippos',
          },
          {
            name: 'isconsecutive',
            type: 5,
            value: false,
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
    expect(response.data.content).toContain(
      'Choose players for a new game of hungry hungry hippos',
    );

    const responseActionRow = response.data.components[0];
    const responseActionRowComponents =
      response.data.components[0].components[0];

    expect(responseActionRow.type).toEqual(MessageComponentTypes.ACTION_ROW);
    expect(responseActionRowComponents.type).toEqual(
      MessageComponentTypes.USER_SELECT,
    );
    expect(responseActionRowComponents.custom_id).toContain(
      'DISCORD_NEWGAME_hungry hungry hippos_',
    );
    expect(responseActionRowComponents.custom_id).toContain('_false');
    expect(responseActionRowComponents.min_values).toEqual(2);
    expect(responseActionRowComponents.max_values).toEqual(20);
  });

  it('should handle /pbem correctly - consecutive', async () => {
    const interaction = {
      type: InteractionType.APPLICATION_COMMAND,
      data: {
        name: 'pbem',
        options: [
          {
            name: 'name',
            type: 3,
            value: 'monopoly',
          },
          {
            name: 'isconsecutive',
            type: 5,
            value: true,
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
    expect(response.data.content).toContain(
      'Choose players for a new game of monopoly',
    );

    const responseActionRow = response.data.components[0];
    const responseActionRowComponents =
      response.data.components[0].components[0];

    expect(responseActionRow.type).toEqual(MessageComponentTypes.ACTION_ROW);
    expect(responseActionRowComponents.type).toEqual(
      MessageComponentTypes.USER_SELECT,
    );
    expect(responseActionRowComponents.custom_id).toContain(
      'DISCORD_NEWGAME_monopoly_',
    );
    expect(responseActionRowComponents.custom_id).toContain('_true');
    expect(responseActionRowComponents.min_values).toEqual(2);
    expect(responseActionRowComponents.max_values).toEqual(20);
  });
});
