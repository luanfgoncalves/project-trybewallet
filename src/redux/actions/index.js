// Action de envio dos dados de Login - conecta loginForm
// const SET_USER_DATA = 'SET_USER_DATA';

const saveUserAction = (email) => ({
  type: 'SET_USER_DATA',
  payload: email,
});

export default saveUserAction;
