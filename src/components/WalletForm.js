import React, { Component } from 'react';
// import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, setExpense } from '../redux/actions/index';

// const INITIAL_TAG = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      // tag: INITIAL_TAG,
      // description: '',
      // total: 0,
    };
  }

  componentDidMount() {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleCLick = () => {
    const { value, description, currency, method, tag } = this.state;
    const { dispatchExpenses } = this.props;
    dispatchExpenses({ value, description, currency, method, tag });
    this.setState({ value: '', description: '' });
  }

  // resetState = () => {
  //   this.setState({
  //     value: '',
  //     description: '',
  //     currency: 'USD',
  //     method: 'Dinheiro',
  //     tag: 'INITIAL_TAG',
  //     // total: 0,
  //   });
  // }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="wallet-form">

        <label htmlFor="value">
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((currenciesElement) => (
            <option key={ currenciesElement }>{currenciesElement}</option>
          ))}
        </select>

        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>
            Dinheiro
          </option>
          <option>
            Cartão de crédito
          </option>
          <option>
            Cartão de débito
          </option>
        </select>

        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>
            Alimentação
          </option>
          <option>
            Lazer
          </option>
          <option>
            Trabalho
          </option>
          <option>
            Transporte
          </option>
          <option>
            Saúde
          </option>
        </select>

        <button
          type="button"
          onClick={ this.handleCLick }
        >
          Adicionar despesa
        </button>

      </form>

    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: () => dispatch(getCurrencies()),
  dispatchExpenses: (expense) => dispatch(setExpense(expense)),
});

WalletForm.propTypes = {
  currencies: PropTypes.func,
  dispatchCurrencies: PropTypes.func,
  dispatchExpenses: PropTypes.func,
}.isRequired;

// export default WalletForm;
export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

// referencia: https://stackoverflow.com/questions/49972382/dispatch-is-not-defined-no-undef
