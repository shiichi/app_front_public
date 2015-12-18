import * as types from '../constants/ActionTypes';
//import { CSRFToken, domainName } from '../utils/csrfUtils';
//import fetch from 'isomorphic-fetch';

export function changeTicketPanel(key) {
  return {
    type: types.CHANGE_TICKET_PANEL,
    key: key,
  };
}
