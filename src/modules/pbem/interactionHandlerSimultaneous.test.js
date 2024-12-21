import { handleRequest } from '../../server';
import {
  MessageComponentTypes,
  ButtonStyleTypes,
  InteractionResponseType,
} from 'discord-interactions';

global.fetch = jest.fn();

describe('Play By Email Interaction Handler - Simultaneous', () => {
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

  it('should create buttons on Game Starting', async () => {
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
                custom_id: '1031_PBEMBUTTON_monopoly_undefined_false',
                label: 'Michael Burnham: Ready',
                style: 1,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id: '1701_PBEMBUTTON_monopoly_undefined_false',
                label: 'James Kirk: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id: '5567_PBEMBUTTON_monopoly_undefined_false',
                label: 'Carol Freeman: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id: '74205_PBEMBUTTON_monopoly_undefined_false',
                label: 'Benjamin Sisko: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id: '74656_PBEMBUTTON_monopoly_undefined_false',
                label: 'Kathryn Janeway: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
            ],
            type: MessageComponentTypes.ACTION_ROW,
          },
          {
            components: [
              {
                custom_id: '76884_PBEMBUTTON_monopoly_undefined_false',
                label: 'Chakotay: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id: '80102_PBEMBUTTON_monopoly_undefined_false',
                label: 'Seven of Nine: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
            ],
            type: MessageComponentTypes.ACTION_ROW,
          },
        ],
        content:
          'Playing: monopoly. (Started at: Sat Dec 21 2024).\n <@1031>, <@1701>, <@5567>, <@74205>, <@74656>, <@76884>, <@80102>',
      },
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    });
  });
});

function MockNewGameInteraction() {
  return {
    data: {
      component_type: MessageComponentTypes.USER_SELECT,
      custom_id: 'DISCORD_NEWGAME_monopoly_Sat Dec 21 2024_false',
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
