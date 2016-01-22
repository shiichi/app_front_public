import fetch from 'isomorphic-fetch';
import { _CSRF_TOKEN, _DOMAIN_NAME } from '../../config/env';

export function fetchWithJson(url, request) {
  return fetch(_DOMAIN_NAME + url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': _CSRF_TOKEN
    },
    credentials: 'same-origin',
    body: JSON.stringify(request)
  });
}
