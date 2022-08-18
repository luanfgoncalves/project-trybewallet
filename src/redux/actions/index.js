// Action de envio dos dados de Login - conecta loginForm
// const SET_USER_DATA = 'SET_USER_DATA';

// ---- Requisição da API que retorna as moedas - REQ 4 ----

// const fetchAPI = async () => {
//   const URL = 'https://economia.awesomeapi.com.br/json/all';
//   const response = await fetch(URL);
//   const data = await response.json();
//   return data;
// };

// const erro = () => { console.log('Não foi possivel obter resposta da API'); };

const fetchAPI = async () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch {
    return {};
  }
};

// ----- Envia o email de usuário - REQ 1 ----

export const saveUserAction = (email) => ({
  type: 'SET_USER_DATA',
  email,
});

// ---- Gerenciamento de moeda - REQ 3 e 4 ----

export const setCurrencies = (currencies) => ({
  type: 'SET_CURRENCIES',
  currencies,
});

export const getCurrencies = () => async (dispatch) => {
  const data = await fetchAPI();

  const currencies = Object.keys(data)
    .filter((currencyName) => currencyName !== 'USDT');

  dispatch(setCurrencies(currencies));
};

// ---- Gerenciamento de Gastos - REQ 4----

export const setTotal = (total) => ({
  type: 'SET_TOTAL',
  total,
});

export const handleExpenses = (expense) => ({
  type: 'HANDLE_EXPENSES',
  expense,
});

export const setExpense = (expense) => async (dispatch) => {
  // recupera a moeda e atualiza o estado global
  const currencies = await fetchAPI();
  dispatch(handleExpenses({ ...expense, exchangeRates: currencies }));

  // seta o valor do paramêtro em type number e identifica a moeda
  const userExpense = Number(expense.value);
  const choosenCurrency = expense.currency !== '' ? expense.currency : 'USD';

  // recupera cotação e faz conversão
  const { ask } = Object.values(currencies)
    .find(({ code }) => code === choosenCurrency);

  dispatch(setTotal(userExpense * Number(ask)));
};

// referencias:
// https://www.codingem.com/javascript-user-input/

// ---- Remoção de despesas - REQ 8----

export const deleteExpense = (deleted) => ({
  type: 'DELETE',
  deleted,
});
