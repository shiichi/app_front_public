import fetch from 'isomorphic-fetch';
import { CSRF_TOKEN, DOMAIN_NAME } from '../../config/env';

export function fetchWithJson(url, request) {
  return fetch(DOMAIN_NAME + url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': CSRF_TOKEN
    },
    credentials: 'same-origin',
    body: JSON.stringify(request)
  });
}
