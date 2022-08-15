import React, { Component } from 'react';
// import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { recoverCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatchCurrency } = this.props;
    dispatchCurrency();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        {currencies && (
          <form>

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
              {currencies.map((currencyData) => (
                <option key={ currencyData }>
                  {currencyData}
                </option>
              ))}
            </select>

            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="dinheiro">
                Dinheiro
              </option>
              <option value="credito">
                Cartão de crédito
              </option>
              <option value="debito">
                Cartão de débito
              </option>
            </select>

            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="alimentacao">
                Alimentação
              </option>
              <option value="lazer">
                Lazer
              </option>
              <option value="trabalho">
                Trabalho
              </option>
              <option value="transporte">
                Transporte
              </option>
              <option value="saude">
                Saúde
              </option>
            </select>

            <button
              type="submit"
              onClick={ this.setExpense }
            >
              Adicionar despesa
            </button>

          </form>
        ) }

      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrency: () => dispatch(recoverCurrencies()),
});

WalletForm.propTypes = {
  dispatchCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// export default WalletForm;
export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
