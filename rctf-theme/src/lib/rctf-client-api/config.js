import { request, handleResponse } from './util';

export async function getConfig() {
  const resp = await request('GET', '/integrations/client/config');
  return handleResponse({ resp, valid: ['goodClientConfig'] })
}