import { handleRequest } from '../../server';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
} from 'discord-interactions';

global.fetch = jest.fn();

describe('Hat Slash Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle less than 2 items', async () => {
    const interaction = {
      type: InteractionType.App,
      data: {
        name: 'hat',
        options: [
          {
            type: 3,
            name: 'name',
            value: 'My hat',
          },
          {
            type: 3,
            name: 'items',
            value: "It's only a single item",
          },
        ],
      },
      id: 'interaction_id',
      token: 'interaction_token',
    };

    const env = {};
    const response = await handleRequest(interaction, env);
    expect(fetch).toHaveBeenCalledTimes(0);
    expect(response.type).toEqual(
      InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    );
    expect(response.data.flags).toEqual(InteractionResponseFlags.EPHEMERAL);
    expect(response.data.content).toContain(
      'You need to add more than 1 item. Make sure to use a comma separated list',
    );
  });

  it('should handle more than 25 items', async () => {
    const interaction = {
      type: InteractionType.App,
      data: {
        name: 'hat',
        options: [
          {
            type: 3,
            name: 'name',
            value: 'The alphabet',
          },
          {
            type: 3,
            name: 'items',
            value: 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x',
          },
        ],
      },
      id: 'interaction_id',
      token: 'interaction_token',
    };

    const env = {};
    const response = await handleRequest(interaction, env);
    expect(fetch).toHaveBeenCalledTimes(0);
    expect(response.type).toEqual(
      InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    );
    expect(response.data.flags).toEqual(InteractionResponseFlags.EPHEMERAL);
    expect(response.data.content).toContain(
      'You can only add up to 25 buttons in a single discord command',
    );
  });

  it('should handle /hat correctly', async () => {
    const interaction = {
      type: InteractionType.App,
      data: {
        name: 'hat',
        options: [
          {
            type: 3,
            name: 'name',
            value: 'Board Games I want to play',
          },
          {
            type: 3,
            name: 'items',
            value:
              'Rivals, Nemesis, Ticket To Ride, Arkham Horror - Living Card Game',
          },
        ],
      },
      id: 'interaction_id',
      token: 'interaction_token',
    };

    const env = {};
    const response = await handleRequest(interaction, env);
    expect(fetch).toHaveBeenCalledTimes(0);
    expect(response.type).toEqual(
      InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    );
    expect(response.data.content).toEqual('Board Games I want to play');
    const components = [
      {
        components: [
          {
            custom_id: 'Rivals_HATBUTTON_Board Games I want to play',
            label: 'Rivals',
            style: 1,
            type: 2,
          },
          {
            custom_id: 'Nemesis_HATBUTTON_Board Games I want to play',
            label: 'Nemesis',
            style: 1,
            type: 2,
          },
          {
            custom_id: 'Ticket To Ride_HATBUTTON_Board Games I want to play',
            label: 'Ticket To Ride',
            style: 1,
            type: 2,
          },
          {
            custom_id:
              'Arkham Horror - Living Card Game_HATBUTTON_Board Games I want to play',
            label: 'Arkham Horror - Living Card Game',
            style: 1,
            type: 2,
          },
          {
            custom_id: 'RANDOM_HATBUTTON_Board Games I want to play',
            label: 'Random',
            style: 2,
            type: 2,
          },
        ],
        type: 1,
      },
    ];
    expect(response.data.components).toEqual(components);
  });
});
