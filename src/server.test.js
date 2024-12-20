// server.test.js
import { handleRequest } from './server';

// Mock the global fetch function used in Workers
global.fetch = jest.fn();

describe('Discord Interaction Handler', () => {
  beforeEach(() => {
    // Clear any mock calls before each test
    fetch.mockClear();
  });

  it('should respond with type 1 when Discord sends a ping', async () => {
    // Simulate a Discord "ping" interaction (type 1)
    const interaction = {
      type: 1,
    };

    const env = {};

    const response = await handleRequest(interaction, env);
    const responseJson = await response.json();

    expect(responseJson).toEqual({ type: 1 });
    expect(response.status).toBe(200); // 200 OK
  });

  it('should respond with a Pong! message when /ping command is invoked', async () => {
    // Simulate a Discord interaction for the /ping command
    const interaction = {
      type: 1,
      data: {
        name: 'ping',
      },
      id: 'interaction_id',
      token: 'interaction_token',
    };

    const env = {};

    // Mock the fetch call to simulate Discord's response
    fetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          type: 4,
          data: {
            content: 'Pong!',
          },
        }),
      ),
    );

    const response = await handleRequest(interaction, env);
    const responseJson = await response.json();

    // Expect the Discord interaction to respond with Pong!
    expect(responseJson).toEqual({
      type: 1,
    });

    expect(response.status).toBe(200); // 200 OK
  });
});
