import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes relativos ao componente Wallet.js', () => {

  test('se os inputs são renderizados corretamente', () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const category = screen.getByTestId('tag-input');

    expect(value).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(currency).toBeInTheDocument()
    expect(method).toBeInTheDocument()
    expect(category).toBeInTheDocument()
  });

  test('se os inputs recebem valores adequadamente', () => {
    renderWithRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');

    userEvent.type(valueInput, '123');
    expect(valueInput).toHaveValue('123');

    userEvent.type(descriptionInput, 'lorem ipsum');
    expect(descriptionInput).toHaveValue('lorem ipsum');;
  })

  test('se o botão /Adicionar despesa/ é renderizado', () => {
    renderWithRedux(<Wallet />);

    const button = screen.getByText('Adicionar despesa');
    expect(button).toBeInTheDocument();
  })

  test('se a plaicação disponibiliza as moedas esperadas', () => {
    renderWithRouterAndRedux(<Wallet />);

    const expected =  [ 'USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE' ];

    expect(INITIAL_STATE.wallet.currencies).toEqual(expected);
  });

  // Header

  test('se o campo /email/ é renderizado no header', () => {
    renderWithRouterAndRedux(<Wallet />);

    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
  })

  test('se o campo /total/ é renderizado no header', () => {
    renderWithRouterAndRedux(<Wallet />);

    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
  })

  test('se o campo /Moeda/ é renderizado no header', () => {
    renderWithRouterAndRedux(<Wallet />);

    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toBeInTheDocument();
  })

});