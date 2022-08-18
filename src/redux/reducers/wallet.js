// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
};

// --- funções de delete - REQ 8 ---
// const filterDeleted = state.expenses.filter((e) => e.id === Number(action.deleted));
// const fValue = filterDeleted[0].value;
// const fCurrency = filterDeleted[0].currency;
// ---

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies };
  case 'HANDLE_EXPENSES':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: state.expenses.length, ...action.expense },
      ],
    };
  case 'SET_TOTAL':
    return {
      ...state,
      total: (Number(state.total) + action.total).toFixed(2),
    };
  case 'DELETE':
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== Number(action.deleted)),
      // total: (Number(state.total) - ((+fValue)
      // * (+filterDeleted[0].exchangeRates[fCurrency].ask))
      //   .toFixed(2)).toFixed(2),
    };
  default:
    return state;
  }
};

export default wallet;

// Referêcia: https://www.w3schools.com/jsref/jsref_tofixed.asp
