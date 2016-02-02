import {
  ADD_EDITING_ROLE,
  ADD_ADDRESS,
  ADD_VALIDATION,
  CLEAR_DISPOSABLE
} from '../constants/ActionTypes';

const initialState = {
  editingRole: null,
  address: {},
  validation: {}
};

export default function disposable(state = initialState, action) {
  switch (action.type) {
  case ADD_EDITING_ROLE:
    return Object.assign({}, state, { 
      editingRole: Object.assign(action.role,
        { permissions: action.role.permissions.map(p => p.id) }
      )
    });

  case ADD_ADDRESS:
    const { stateName, city, street } = action.address;
    return Object.assign({}, state, { 
      address: { state: stateName, city, street }
    });

  case ADD_VALIDATION:
    return Object.assign({}, state, {
      validation: action.validation
    });

  case CLEAR_DISPOSABLE:
    return initialState;

  default:
    return state;
  }
}
