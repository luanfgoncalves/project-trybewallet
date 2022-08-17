import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes relativos ao componente Login.js', () => {

  test('se o texto /TrybeWallet/ é renderizado', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.getByRole('heading', { name: /trybewallet/i, level: 2 });

    expect(title).toBeInTheDocument();
  });

  test('se o input de email é renderizado', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('email-input');

    expect(email).toBeInTheDocument();
  });

  test('se o input de senha é renderizado', () => {
    renderWithRouterAndRedux(<App />);

    const password = screen.getByTestId('password-input');

    expect(password).toBeInTheDocument();
  });

  test('se o botão /Entrar/ é renderizado', () => {
    renderWithRouterAndRedux(<App />);

    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(loginBtn).toBeInTheDocument();
  });

  test('a bvalidação do login e senha', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'teste');

    userEvent.type(password, 'teste');

    expect(loginBtn.disabled).toBeTruthy();

    userEvent.type(email, 'teste@gmail.com');

    userEvent.type(password, 'teste123');

    expect(loginBtn.disabled).toBeFalsy();
  });

});