import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import mockData from "./helpers/mockData";

// import App from '../App';
import Wallet from '../pages/Wallet';
// import WalletForm from '../components/WalletForm';
import Header from '../components/Header';
import Table from "../components/Table";

const INITIAL_STATE = {
  user: {
    email: 'teste@teste.com'
  },
  wallet: {
    currencies: [ 'USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE' ],
    expenses: [
      {
        id: 0,
        value: '1',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'teste',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '2',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'teste 2',
        exchangeRates: mockData,
      }
    ]
  }
}

describe('Testes relativos a WalletForm.js em /carteira', () => {

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

  test('se o botão /Adicionar despesa/ é renderizado', () => {
    renderWithRouterAndRedux(<Wallet />);

    const button = screen.getByText('Adicionar despesa');
    expect(button).toBeInTheDocument();
  })

  test('se os inputs recebem valores', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');

    userEvent.type(valueInput, '123');
    expect(valueInput).toHaveValue(123);

    userEvent.type(descriptionInput, 'lorem ipsum');
    expect(descriptionInput).toHaveValue('lorem ipsum');;
  })

  test('se despesas são adicionadas', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const button = screen.getByText('Adicionar despesa');

    userEvent.type(valueInput, '123');
    userEvent.type(descriptionInput, 'lorem ipsum');
    userEvent.click(button);

  })

  test('se a plaicação disponibiliza as moedas esperadas', () => {
    renderWithRouterAndRedux(<Wallet />);

    const expected =  [ 'USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE' ];

    expect(INITIAL_STATE.wallet.currencies).toEqual(expected);
  });

});

// ---------------------------------------------------------------

describe('Testes relativos a Header.js em /carteira', () => {

  test('se o campo /email/ é renderizado no header', () => {
    renderWithRouterAndRedux(<Header />);

    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
  })

  test('se o campo /total/ é renderizado no header', () => {
    renderWithRouterAndRedux(<Header />);

    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
  })

  test('se o campo /Moeda/ é renderizado no header', () => {
    renderWithRouterAndRedux(<Header />);

    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toBeInTheDocument();
  })

  test('se os componentes do Header são funcionais', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const category = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(value, '1');
    userEvent.type(description, 'teste');
    userEvent.selectOptions(currency, 'USD');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(category, 'Alimentação');
    userEvent.click(button);

    await waitFor(() => {
      const totalField = screen.findByTestId('total-field');
      expect(totalField).toContainHTML('4.75');
      })

  })

})

// --------------------------------------------------------------

describe('Testes relativos a Table.js em /carteira', () => {

  test('se a informação é alterada na store corretamente', async () => {
    renderWithRouterAndRedux(<Wallet />)

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const button = screen.getByRole('button', { name: 'Adicionar despesa' });

    const td1 = screen.getByTestId('td1');
    const td2 = screen.getByTestId('td2');
    const td3 = screen.getByTestId('td3');
    const td4 = screen.getByTestId('td4');
    const td5 = screen.getByTestId('td5');
    const td6 = screen.getByTestId('td6');
    const td7 = screen.getByTestId('td7');

    expect(td1).not.toBeInTheDocument();
    expect(td2).not.toBeInTheDocument();
    expect(td3).not.toBeInTheDocument();
    expect(td4).not.toBeInTheDocument();
    expect(td5).not.toBeInTheDocument();
    expect(td6).not.toBeInTheDocument();
    expect(td7).not.toBeInTheDocument();


    userEvent.type(value, '1');
    userEvent.type(description, 'teste');
    userEvent.click(button)
  
    await waitFor(() => {
      expect(td1).toBeInTheDocument();
      expect(td2).toBeInTheDocument();
      expect(td3).toBeInTheDocument();
      expect(td4).toBeInTheDocument();
      expect(td5).toBeInTheDocument();
      expect(td6).toBeInTheDocument();
      expect(td7).toBeInTheDocument();
      })

  });

  test('se o botão exclui dados da Global Store', () => {
    const { store } = renderWithRouterAndRedux(<Table />, { initialState: INITIAL_STATE });

    const button = screen.getAllByTestId('delete-btn');
    userEvent.click(button[0]);

    const expected = [
      {
        id: 1,
        value: '2',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'teste 2',
        exchangeRates: mockData,
      },
    ]

    expect(store.getState().wallet.expenses).toEqual(expected)
  });
})
