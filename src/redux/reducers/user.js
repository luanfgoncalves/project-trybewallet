// import { SET_USER_DATA } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  // const { email } = action;
  switch (action.type) {
  case 'SET_USER_DATA':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user; // usar o mesmo nome no index pra simplificar
