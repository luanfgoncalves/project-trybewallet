// Action de envio dos dados de Login - conecta loginForm
// const SET_USER_DATA = 'SET_USER_DATA';

export const saveUserAction = (email) => ({
  type: 'SET_USER_DATA',
  email,
});

// Define a moeda
export const setCurrencies = (currencies) => ({
  type: 'SET_CURRENCIES',
  currencies,
});

// recupera a moeda escolhida
const getCurrencies = async () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const data = response.json();
  return data;
};

export const recoverCurrencies = () => async (dispatch) => {
  const response = await getCurrencies();
  const data = Object.keys(response).filter((currency) => currency !== 'USDT');
  dispatch(setCurrencies(data));
};
