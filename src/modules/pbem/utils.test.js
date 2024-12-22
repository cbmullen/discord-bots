import { SplitCustomId, SplitMessage, GetSelectedUsers } from './utils';

global.fetch = jest.fn();

describe('Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should split the customId correctly', async () => {
    const customId = 'DISCORD_PLAYERSORTING_foo_Sat Dec 21 2024_both';
    const result = SplitCustomId(customId);
    expect(result.datetime).toEqual('Sat Dec 21 2024');
    expect(result.header).toEqual('PLAYERSORTING');
    expect(result.mode).toEqual('both');
    expect(result.name).toEqual('foo');
    expect(result.uid).toEqual('DISCORD');
  });

  it('should split the alert message correctly', async () => {
    const alertMessage = 'Playing a game\nKirk(Jim)';
    const result = SplitMessage(alertMessage);
    expect(result).toEqual({ alert: 'Kirk(Jim)', message: 'Playing a game' });
  });

  it('should get selected Users from interaction into a list', async () => {
    const interaction = {
      data: {
        resolved: {
          users: {
            1701: { username: 'James Kirk', id: 1701 },
            74656: { username: 'Kathryn Janeway', id: 74656 },
          },
        },
      },
    };

    const result = GetSelectedUsers(interaction);
    expect(result).toEqual([
      { id: 1701, username: 'James Kirk' },
      { id: 74656, username: 'Kathryn Janeway' },
    ]);
  });
});
