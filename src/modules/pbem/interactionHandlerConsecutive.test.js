import { handleRequest } from '../../server';
import {
  ButtonStyleTypes,
  MessageComponentTypes,
  InteractionResponseType,
} from 'discord-interactions';

global.fetch = jest.fn();

describe('Play By Email Interaction Handler - Consecutive', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockResolvedValue(
      new Response('{"data": "previous message was deleted"}', {
        status: 200,
        ok: true,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return player sorting on Game Starting', async () => {
    const mockNewGameInteraction = MockNewGameInteraction();
    const env = {};
    const response = await handleRequest(mockNewGameInteraction, env);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      data: {
        components: [
          {
            components: [
              {
                custom_id:
                  '$DISCORD_PLAYERSORTING_monopoly_Sat Dec 21 2024_true',
                options: [
                  { label: 'Michael Burnham', value: '1031' },
                  { label: 'James Kirk', value: '1701' },
                  { label: 'Carol Freeman', value: '5567' },
                  { label: 'Benjamin Sisko', value: '74205' },
                  { label: 'Kathryn Janeway', value: '74656' },
                  { label: 'Chakotay', value: '76884' },
                  { label: 'Seven of Nine', value: '80102' },
                ],
                type: MessageComponentTypes.STRING_SELECT,
              },
            ],
            type: MessageComponentTypes.ACTION_ROW,
          },
        ],
        content: 'Select Player 1',
      },
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    });
  });

  it('should handle player sorting multiple rows - return another sorting request', async () => {
    const mockPlayerSortingInteraction = MockPlayerSortingInteraction('80102'); // Select Seven of Nine, not last
    const env = {};
    const response = await handleRequest(mockPlayerSortingInteraction, env);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      data: {
        components: [
          {
            components: [
              {
                custom_id:
                  'DISCORD_PLAYERSORTING_monopoly_Sat Dec 21 2024_true',
                options: [
                  { label: 'James Kirk', value: '1701' },
                  { label: 'Kathryn Janeway', value: '74656' },
                  { label: 'Benjamin Sisko', value: '74205' },
                  { label: 'Michael Burnham', value: '1031' },
                  { label: 'Carol Freeman', value: '5567' },
                  { label: 'Chakotay', value: '76884' },
                ],
                type: MessageComponentTypes.STRING_SELECT,
              },
            ],
            type: MessageComponentTypes.ACTION_ROW,
          },
        ],
        content: 'Select Player 2',
      },
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    });
  });

  it('should handle player sorting last two - return buttons', async () => {
    // Create new slash command to clear userlist from previous test
    await handleRequest(MockNewGameInteraction(), env);

    // When you select one, it adds both in order.
    const mockPlayerSortingInteraction =
      MockPlayerSortingInteractionLastTwo('74656'); // Select Janeway, last 2 in the list, so Kirk goes last.
    const env = {};
    const response = await handleRequest(mockPlayerSortingInteraction, env);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      data: {
        components: [
          {
            components: [
              {
                custom_id: '74656_PBEMBUTTON_monopoly_undefined_true',
                disabled: true,
                label: 'Kathryn Janeway: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id: '1701_PBEMBUTTON_monopoly_undefined_true',
                disabled: false,
                label: 'James Kirk: Done',
                style: ButtonStyleTypes.SUCCESS,
                type: MessageComponentTypes.BUTTON,
              },
            ],
            type: MessageComponentTypes.ACTION_ROW,
          },
        ],
        content: 'Playing: monopoly. (Started at: Sat Dec 21 2024).\n <@74656>',
      },
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    });
  });
});

function MockNewGameInteraction() {
  return {
    data: {
      component_type: MessageComponentTypes.USER_SELECT,
      custom_id: 'DISCORD_NEWGAME_monopoly_Sat Dec 21 2024_true',
      resolved: {
        users: {
          1701: { username: 'James Kirk', id: 1701 },
          74656: { username: 'Kathryn Janeway', id: 74656 },
          74205: { username: 'Benjamin Sisko', id: 74205 },
          1031: { username: 'Michael Burnham', id: 1031 },
          80102: { username: 'Seven of Nine', id: 80102 },
          5567: { username: 'Carol Freeman', id: 5567 },
          76884: { username: 'Chakotay', id: 76884 },
        },
      },
    },
    message: {
      channel_id: '928350272617599009',
      id: '1319981699303608412',
    },
  };
}

function MockPlayerSortingInteraction(playerId) {
  return {
    // Player selection
    data: {
      component_type: MessageComponentTypes.STRING_SELECT,
      custom_id: 'DISCORD_PLAYERSORTING_monopoly_Sat Dec 21 2024_true',
      values: [playerId],
    },
    // From message
    message: {
      channel_id: '928350272617599009',
      id: '1319981699303608412',
      components: [
        {
          components: [
            {
              custom_id: '$DISCORD_PLAYERSORTING_monopoly_Sat Dec 21 2024_true',
              options: [
                {
                  label: 'James Kirk',
                  value: '1701',
                },
                {
                  label: 'Kathryn Janeway',
                  value: '74656',
                },
                {
                  label: 'Benjamin Sisko',
                  value: '74205',
                },
                {
                  label: 'Michael Burnham',
                  value: '1031',
                },
                {
                  label: 'Seven of Nine',
                  value: '80102',
                },
                {
                  label: 'Carol Freeman',
                  value: '5567',
                },
                {
                  label: 'Chakotay',
                  value: '76884',
                },
              ],
              type: MessageComponentTypes.STRING_SELECT,
            },
          ],
        },
      ],
    },
  };
}

function MockPlayerSortingInteractionLastTwo(playerId) {
  return {
    // Player selection
    data: {
      component_type: MessageComponentTypes.STRING_SELECT,
      custom_id: 'DISCORD_PLAYERSORTING_monopoly_Sat Dec 21 2024_true',
      values: [playerId],
    },
    // From message
    message: {
      channel_id: '928350272617599009',
      id: '1319981699303608413',
      components: [
        {
          components: [
            {
              custom_id: '$DISCORD_PLAYERSORTING_monopoly_Sat Dec 21 2024_true',
              options: [
                {
                  label: 'James Kirk',
                  value: '1701',
                },
                {
                  label: 'Kathryn Janeway',
                  value: '74656',
                },
              ],
              type: MessageComponentTypes.STRING_SELECT,
            },
          ],
        },
      ],
    },
  };
}
