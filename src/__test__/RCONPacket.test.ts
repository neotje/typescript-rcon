import RCONPacket from '../RCONPacket';

test('RCONPacket', () => {
  const packet = RCONPacket.createFrom(1, 2, 'test');

  expect(packet.payloadLength).toBe(14);
  expect(packet.requestId).toBe(1);
  expect(packet.type).toBe(2);
  expect(packet.payload).toMatch('test');
});
