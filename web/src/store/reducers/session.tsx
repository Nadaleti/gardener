import { removeSessionFromLocalStorage, loadSessionFromLocalStorage } from '../localstorage';

const initialState = loadSessionFromLocalStorage();

interface Action {
  type: string;
  payload: any;
}

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ADD_USER_INFO = 'ADD_USER_INFO';

const sessionReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.payload.token };

    case LOGOUT:
      removeSessionFromLocalStorage();
      return {token: '', name: '', gender: ''};

    case ADD_USER_INFO:
      return {...state, name: action.payload.name, gender: action.payload.gender};

    default:
      return state;
  }
}

export const loginAction = (token: string): Action => {
  return {
    type: LOGIN,
    payload: {token}
  }
}

export const logoutAction = (): Action => {
  return {
    type: LOGOUT,
    payload: null
  }
}

export const addUserInfoAction = (userInfo: {name: string, gender: string}): Action => {
  return {
    type: ADD_USER_INFO,
    payload: {...userInfo}
  }
}

export default sessionReducer;
