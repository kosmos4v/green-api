import { handleActions } from 'redux-actions';
import { SAVE_USER_DATA } from '../actions/user';

export type TUserState = {
  userId: string,
};

export type TUserAction = {
  userId: string,
};

const initialState: TUserState = {
  userId: '',
};

const userReducer = handleActions<TUserState, TUserAction>({
  [SAVE_USER_DATA]: (state, { payload }) => ({
    ...state,
    userId: payload.userId,
  }),

}, initialState);

export default userReducer;
