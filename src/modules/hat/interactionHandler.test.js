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
  });

  afterEach(() => {
    Math.random.mockRestore();
    jest.clearAllMocks();
  });

  //TODO: It should handle clicking on a "free" button
  //TODO: It should handle clicking on a selected button

  it('should handle clicking the random button', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    fetch.mockResolvedValue(
      new Response('{"data": "previous message was deleted"}', {
        status: 200,
        ok: true,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const interaction = MockInteraction();
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
});

it('should handle clicking the random button after no more selections are available', async () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.5);

  fetch.mockResolvedValue(
    new Response('{"data": "previous message was deleted"}', {
      status: 200,
      ok: true,
      headers: { 'Content-Type': 'application/json' },
    }),
  );

  // Set up data
  const interaction = MockInteractionAllSelected();
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
  jest.spyOn(Math, 'random').mockReturnValue(0.5);

  fetch.mockResolvedValue(
    new Response('{"data": "previous message was deleted"}', {
      status: 200,
      ok: true,
      headers: { 'Content-Type': 'application/json' },
    }),
  );

  // Set up data
  const interaction = MockInteraction();
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
  expect(response.data.components[0].components[0].style).toEqual(
    ButtonStyleTypes.PRIMARY,
  );
});

function MockInteractionAllSelected() {
  return {
    data: {
      custom_id: 'RANDOM_HATBUTTON_test',
    },
    member: {
      user: {
        username: 'Malcolm Reynolds',
      },
    },
    message: {
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
function MockInteraction() {
  return {
    data: {
      custom_id: 'RANDOM_HATBUTTON_test',
    },
    member: {
      user: {
        username: 'Malcolm Reynolds',
      },
    },
    message: {
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
