import { SplitCustomId } from './utils';

global.fetch = jest.fn();

describe('Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should split the customId correctly', async () => {
    const customId = 'Ticket To Ride_HATBUTTON_Board Games I want to play';
    const result = SplitCustomId(customId);
    expect(result.item).toEqual('Ticket To Ride');
    expect(result.type).toEqual('HATBUTTON');
    expect(result.hatName).toEqual('Board Games I want to play');
  });
});
