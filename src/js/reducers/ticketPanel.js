import {
  CHANGE_TICKET_PANEL
} from '../constants/ActionTypes';

const initialState = "1";

export default function ticketPanel(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TICKET_PANEL:
      return action.key;

    default:
      return state;
  }
}
