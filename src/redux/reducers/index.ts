import { combineReducers } from 'redux';
import user, { TUserState } from './user';
import chat, { TChatState } from './chats';

export type TRootState = {
  user: TUserState,
  chat: TChatState,
};

const reducer = combineReducers({
  user,
  chat,
});

export default reducer;
