import * as types from '../constants/ActionTypes';
import * as UserAPIUtils from '../utils/UserAPIUtils';

export function getUserinfo() {
  return {
    types: [
      types.GET_USERINFO,
      types.GET_USERINFO_SUCCESS,
      types.GET_USERINFO_FAIL
    ],
    promise: UserAPIUtils.getUserinfo()
  };
}
