// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
};

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
  default:
    return state;
  }
};

export default wallet;

// Referêcia: https://www.w3schools.com/jsref/jsref_tofixed.asp
