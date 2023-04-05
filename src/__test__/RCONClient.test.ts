import RCONClient from '../RCONClient';

describe('RCONClient', () => {
  const client = new RCONClient('localhost', 25575);

  it('should not connect to the server', async () => {
    await expect(client.connect('invalid-pass')).rejects.toThrow('Authentication failed');

    expect(client.socket.destroyed).toBe(true);
    expect(client.socket.listenerCount('error')).toBe(0);
    expect(client.socket.listenerCount('data')).toBe(0);
    expect(client.socket.listenerCount('connect')).toBe(0);
  });

  it('should connect to the server', async () => {
    await client.connect('test');

    expect(client.socket.listenerCount('error')).toBe(0);
    expect(client.socket.listenerCount('data')).toBe(0);
    expect(client.socket.listenerCount('connect')).toBe(0);
  });

  it('should send a command to the server', async () => {
    const result = await client.sendCommand('version');

    expect(result).toMatch(/This server is running/);

    expect(client.socket.listenerCount('error')).toBe(0);
    expect(client.socket.listenerCount('data')).toBe(0);
    expect(client.socket.listenerCount('connect')).toBe(0);
  });
});
