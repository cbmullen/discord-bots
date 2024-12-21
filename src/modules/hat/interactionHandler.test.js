import { handleRequest } from '../../server';
import {
  ButtonStyleTypes,
  InteractionResponseType,
  InteractionResponseFlags,
} from 'discord-interactions';

global.fetch = jest.fn();

describe('Hat Interaction Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    fetch.mockResolvedValue(
      new Response('{"data": "previous message was deleted"}', {
        status: 200,
        ok: true,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  afterEach(() => {
    Math.random.mockRestore();
    jest.clearAllMocks();
  });

  //TODO: It should handle clicking on a selected button

  it('should handle clicking on a free button in the first row', async () => {
    const interaction = MockInteraction('b_HATBUTTON_test'); // Button B is pressed.
    const env = {};

    const response = await handleRequest(interaction, env);
    expect(fetch).toHaveBeenCalledTimes(1);

    expect(response.data.components[0].components[0].label).toEqual(
      // Row 0 Button 0 (indexed) = A
      'a',
    );
    expect(response.data.components[0].components[0].style).toEqual(
      ButtonStyleTypes.PRIMARY,
    );

    expect(response.data.components[0].components[1].label).toEqual(
      // Row 0 Button 1 (indexed) = B
      'b (Malcolm Reynolds)',
    );
    expect(response.data.components[0].components[1].style).toEqual(
      ButtonStyleTypes.SUCCESS,
    );
  });

  it('should handle clicking on a free button in the second row', async () => {
    const interaction = MockInteraction('g_HATBUTTON_test'); // Button B is pressed.
    const env = {};

    const response = await handleRequest(interaction, env);
    expect(fetch).toHaveBeenCalledTimes(1);

    expect(response.data.components[0].components[0].label).toEqual(
      // Row 0 Button 0 (indexed) = A
      'a',
    );
    expect(response.data.components[0].components[0].style).toEqual(
      ButtonStyleTypes.PRIMARY,
    );

    expect(response.data.components[1].components[1].label).toEqual(
      // Row 0 Button 1 (indexed) = G
      'g (Malcolm Reynolds)',
    );
    expect(response.data.components[1].components[1].style).toEqual(
      ButtonStyleTypes.SUCCESS,
    );
  });

  it('should handle clicking on a selected button', async () => {
    const interaction = MockInteraction('g_HATBUTTON_test'); // Button B is pressed.
    const env = {};

    // Set Data to clicked
    interaction.message.components[1].components[1].label = 'e (Jayne Cobb)';
    interaction.message.components[1].components[1].style =
      ButtonStyleTypes.SUCCESS;

    const response = await handleRequest(interaction, env);
    expect(fetch).toHaveBeenCalledTimes(1);

    expect(response.data.components[0].components[0].label).toEqual(
      // Row 0 Button 0 (indexed) = A
      'a',
    );
    expect(response.data.components[0].components[0].style).toEqual(
      ButtonStyleTypes.PRIMARY,
    );

    expect(response.data.components[1].components[1].label).toEqual(
      // Row 0 Button 1 (indexed) = G
      'g',
    );
    expect(response.data.components[1].components[1].style).toEqual(
      ButtonStyleTypes.PRIMARY,
    );
  });

  it('should handle clicking the random button', async () => {
    const interaction = MockInteraction('RANDOM_HATBUTTON_test');
    const env = {};

    const response = await handleRequest(interaction, env);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response.data.components[0].components[4].label).toEqual(
      'e (Malcolm Reynolds)',
    );
    expect(response.data.components[0].components[4].style).toEqual(
      ButtonStyleTypes.SUCCESS,
    );
    expect(response.data.components[0].components[0].style).toEqual(
      ButtonStyleTypes.PRIMARY,
    );
  });

  it('should handle clicking the random button after no more selections are available', async () => {
    const interaction = MockInteractionAllSelected('RANDOM_HATBUTTON_test');
    const env = {};

    const response = await handleRequest(interaction, env);
    expect(fetch).toHaveBeenCalledTimes(0);
    expect(response.type).toEqual(
      InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    );
    expect(response.data.flags).toEqual(InteractionResponseFlags.EPHEMERAL);
    expect(response.data.content).toContain('No more items available to pick!');
  });

  it('should handle clicking the random button after selections have been chosen', async () => {
    const interaction = MockInteraction('RANDOM_HATBUTTON_test');
    interaction.message.components[0].components[4].label = 'e (Jayne Cobb)';
    interaction.message.components[0].components[4].style =
      ButtonStyleTypes.SUCCESS;

    const env = {};
    const response = await handleRequest(interaction, env);

    expect(fetch).toHaveBeenCalledTimes(1);
    // Doesn't undo what was previously set.
    expect(response.data.components[0].components[4].label).toEqual(
      'e (Jayne Cobb)',
    );
    expect(response.data.components[0].components[4].style).toEqual(
      ButtonStyleTypes.SUCCESS,
    );
    expect(response.data.components[0].components[0].style).toEqual(
      ButtonStyleTypes.PRIMARY,
    );

    // But finds a new button to "randomly" select
    expect(response.data.components[0].components[3].label).toEqual(
      'd (Malcolm Reynolds)',
    );
    expect(response.data.components[0].components[3].style).toEqual(
      ButtonStyleTypes.SUCCESS,
    );
  });
});

function MockInteractionAllSelected(customId) {
  return {
    data: {
      custom_id: customId, // The button that is pressed
    },
    member: {
      user: {
        username: 'Malcolm Reynolds',
      },
    },
    message: {
      content: 'Who wants to click the button?',
      channel_id: '1234567890',
      id: '0987654321',
      components: [
        //Stupid model. 5 Buttons to a row. Up to 5 rows
        {
          components: [
            {
              custom_id: 'a_HATBUTTON_test',
              id: 2,
              label: 'a (Jayne Cobb)',
              style: 1,
              type: 2,
            },
            {
              custom_id: 'b_HATBUTTON_test',
              id: 2,
              label: 'b (Jayne Cobb)',
              style: 1,
              type: 2,
            },
            {
              custom_id: 'RANDOM_HATBUTTON_test',
              id: 5,
              label: 'Random',
              style: 2,
              type: 2,
            },
          ],
        },
      ],
    },
  };
}

// Mock this model so it can be re-used.
function MockInteraction(customId) {
  return {
    data: {
      custom_id: customId, // The button that is pressed
    },
    member: {
      user: {
        username: 'Malcolm Reynolds',
      },
    },
    message: {
      content: 'Who wants to click the button?',
      channel_id: '1234567890',
      id: '0987654321',
      components: [
        //Stupid model. 5 Buttons to a row. Up to 5 rows
        {
          components: [
            {
              custom_id: 'a_HATBUTTON_test',
              id: 2,
              label: 'a',
              style: 1,
              type: 2,
            },
            {
              custom_id: 'b_HATBUTTON_test',
              id: 2,
              label: 'b',
              style: 1,
              type: 2,
            },
            {
              custom_id: 'c_HATBUTTON_test',
              id: 2,
              label: 'c',
              style: 1,
              type: 2,
            },
            {
              custom_id: 'd_HATBUTTON_test',
              id: 2,
              label: 'd',
              style: 1,
              type: 2,
            },
            {
              custom_id: 'e_HATBUTTON_test',
              id: 2,
              label: 'e',
              style: 1,
              type: 2,
            },
          ],
        },
        {
          components: [
            {
              custom_id: 'f_HATBUTTON_test',
              id: 2,
              label: 'f',
              style: 1,
              type: 2,
            },
            {
              custom_id: 'g_HATBUTTON_test',
              id: 2,
              label: 'g',
              style: 1,
              type: 2,
            },
            {
              custom_id: 'h_HATBUTTON_test',
              id: 2,
              label: 'h',
              style: 1,
              type: 2,
            },
            {
              custom_id: 'RANDOM_HATBUTTON_test',
              id: 5,
              label: 'Random',
              style: 2,
              type: 2,
            },
          ],
        },
      ],
    },
  };
}
