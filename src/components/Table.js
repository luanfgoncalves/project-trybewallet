import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  handleClick = (event) => {
    const { id } = event.target;
    const { dispatchDelete } = this.props;
    dispatchDelete(id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>

        <thead>

          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>

        </thead>

        { expenses.map((element) => {
          const coin = element.exchangeRates[element.currency];
          return (
            <tbody key={ element.id }>

              <tr>
                <td data-testid="td1">{element.description}</td>
                <td data-testid="td2">{element.tag}</td>
                <td data-testid="td3">{element.method}</td>
                <td data-testid="td4">{Number(element.value).toFixed(2)}</td>
                <td data-testid="td5">{coin.name}</td>
                <td data-testid="td6">{(Math.round(coin.ask * 100) / 100).toFixed(2)}</td>
                <td data-testid="td7">{(element.value * coin.ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    id={ element.id }
                    onClick={ (event) => this.handleClick(event) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>

          );
        }) }

      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDelete: (expense) => dispatch(deleteExpense(expense)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  dispatchDelete: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);

// Referencias:
// https://www.w3schools.com/tags/tag_th.asp
// https://www.w3schools.com/tags/tag_tbody.asp
