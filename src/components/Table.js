import React, { Component } from 'react';

export default class Table extends Component {
  render() {
    return (
      <div>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </div>
    );
  }
}

// Referencia: https://www.w3schools.com/tags/tag_th.asp
