import { handleRequest } from '../../server.js';
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
    expect(fetch).toHaveBeenCalledTimes(0);
    expect(response).toEqual({
      data: {
        components: [
          {
            components: [
              {
                custom_id:
                  '1031_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Michael Burnham: Ready',
                style: 1,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '1701_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'James Kirk: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '5567_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Carol Freeman: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '74205_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Benjamin Sisko: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '74656_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
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
                custom_id:
                  '76884_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Chakotay: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '80102_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Seven of Nine: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  'DELETE_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Delete',
                style: ButtonStyleTypes.DANGER,
                type: MessageComponentTypes.BUTTON,
              },
            ],
            type: MessageComponentTypes.ACTION_ROW,
          },
        ],
        content:
          'Playing: hungry hungry hippos.\n <@1031>, <@1701>, <@5567>, <@74205>, <@74656>, <@76884>, <@80102>',
      },
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    });
  });

  it('should handle clicking a button', async () => {
    const mockPlayerButtonClick = MockPlayerButtonClick('74205'); // Kirk's button was previously clicked. Sisko's button is clicked
    const env = {};
    const response = await handleRequest(mockPlayerButtonClick, env);
    expect(fetch).toHaveBeenCalledTimes(0);
    expect(response).toEqual({
      data: {
        components: [
          {
            components: [
              {
                custom_id:
                  '1031_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Michael Burnham: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '1701_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'James Kirk: Done',
                style: ButtonStyleTypes.SUCCESS,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '5567_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Carol Freeman: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '74205_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Benjamin Sisko: Done',
                style: ButtonStyleTypes.SUCCESS,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '74656_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
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
                custom_id:
                  '76884_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Chakotay: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '80102_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Seven of Nine: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
            ],
            type: MessageComponentTypes.ACTION_ROW,
          },
        ],
        content:
          'Playing: hungry hungry hippos.\n <@1031>, <@5567>, <@74656>, <@76884>, <@80102>',
      },
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    });
  });

  it('should handle un-clicking a button', async () => {
    const mockPlayerButtonClick = MockPlayerButtonClick('1701'); // Kirk's button was previously clicked. Kirk's button is clicked again
    const env = {};
    const response = await handleRequest(mockPlayerButtonClick, env);
    expect(fetch).toHaveBeenCalledTimes(0);
    expect(response).toEqual({
      data: {
        components: [
          {
            components: [
              {
                custom_id:
                  '1031_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Michael Burnham: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '1701_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'James Kirk: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '5567_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Carol Freeman: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '74205_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Benjamin Sisko: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '74656_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
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
                custom_id:
                  '76884_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Chakotay: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
              {
                custom_id:
                  '80102_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
                label: 'Seven of Nine: Ready',
                style: ButtonStyleTypes.PRIMARY,
                type: MessageComponentTypes.BUTTON,
              },
            ],
            type: MessageComponentTypes.ACTION_ROW,
          },
        ],
        content:
          'Playing: hungry hungry hippos.\n <@1031>, <@1701>, <@5567>, <@74205>, <@74656>, <@76884>, <@80102>',
      },
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    });
  });
});

function MockNewGameInteraction() {
  return {
    data: {
      component_type: MessageComponentTypes.USER_SELECT,
      custom_id:
        'DISCORD_NEWGAME_hungry hungry hippos_Sat Dec 21 2024_simultaneous',
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

function MockPlayerButtonClick(playerId) {
  return {
    // Player selection
    data: {
      component_type: MessageComponentTypes.BUTTON,
      custom_id: `${playerId}_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous`, // Player button clicked.
    },
    // From message
    message: {
      channel_id: '928350272617599009',
      content:
        'Playing: hungry hungry hippos.\n <@1031>, <@5567>, <@74205>, <@74656>, <@76884>, <@80102>',
      id: '1319981699303608413',
      components: [
        {
          components: [
            {
              custom_id:
                '1031_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
              label: 'Michael Burnham: Ready',
              style: ButtonStyleTypes.PRIMARY,
              type: MessageComponentTypes.BUTTON,
            },
            {
              custom_id:
                '1701_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
              label: 'James Kirk: Done',
              style: ButtonStyleTypes.SUCCESS,
              type: MessageComponentTypes.BUTTON,
            },
            {
              custom_id:
                '5567_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
              label: 'Carol Freeman: Ready',
              style: ButtonStyleTypes.PRIMARY,
              type: MessageComponentTypes.BUTTON,
            },
            {
              custom_id:
                '74205_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
              label: 'Benjamin Sisko: Ready',
              style: ButtonStyleTypes.PRIMARY,
              type: MessageComponentTypes.BUTTON,
            },
            {
              custom_id:
                '74656_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
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
              custom_id:
                '76884_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
              label: 'Chakotay: Ready',
              style: ButtonStyleTypes.PRIMARY,
              type: MessageComponentTypes.BUTTON,
            },
            {
              custom_id:
                '80102_PBEMBUTTON_hungry hungry hippos_undefined_simultaneous',
              label: 'Seven of Nine: Ready',
              style: ButtonStyleTypes.PRIMARY,
              type: MessageComponentTypes.BUTTON,
            },
          ],
          type: MessageComponentTypes.ACTION_ROW,
        },
      ],
    },
  };
}
