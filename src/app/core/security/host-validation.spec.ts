import { isAllowedHostname } from './host-validation';

describe('host validation', () => {
  it('allows the production domain', () => {
    expect(isAllowedHostname('app-arquitectura-pearl.vercel.app')).toBeTrue();
  });

  it('allows localhost for Angular development', () => {
    expect(isAllowedHostname('localhost')).toBeTrue();
  });

  it('blocks a SET clone served from the loopback IP', () => {
    expect(isAllowedHostname('127.0.0.1')).toBeFalse();
  });

  it('blocks unknown domains', () => {
    expect(isAllowedHostname('copia-ejemplo.com')).toBeFalse();
  });
});
