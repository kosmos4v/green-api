export const SAVE_USER_DATA = 'SAVE_USER_DATA';

export const saveUserData  = (userId: string) => ({
  type: [SAVE_USER_DATA],
  payload:{
    userId,
  },
});