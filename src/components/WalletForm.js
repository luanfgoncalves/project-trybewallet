import React, { Component } from 'react';
// import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { recoverCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatchCurrency } = this.props;
    dispatchCurrency();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        {currencies && (
          <form>

            <label htmlFor="value-input">
              <input
                type="number"
                name="value-input"
                id="value-input"
                data-testid="value-input"
              />
            </label>
            <label htmlFor="description-input">
              <input
                type="text"
                name="description-input"
                id="description-input"
                data-testid="description-input"
              />
            </label>

            <select data-testid="currency-input">
              {currencies.map((currency) => (
                <option key={ currency }>
                  {currency}
                </option>
              ))}
            </select>

            <select data-testid="method-input">
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

            <select data-testid="tag-input">
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
