import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{coin.name}</td>
                <td>{(Math.round(coin.ask * 100) / 100).toFixed(2)}</td>
                <td>{(element.value * coin.ask).toFixed(2)}</td>
                <td>Real</td>
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

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Table);

// Referencias:
// https://www.w3schools.com/tags/tag_th.asp
// https://www.w3schools.com/tags/tag_tbody.asp
