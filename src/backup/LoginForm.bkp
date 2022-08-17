import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // tem que ser lowerCase
import saveUserAction from '../redux/actions';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoginDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validateLogin();
    });
  };

  handleCLick = () => {
    const { history, saveUser } = this.props;
    const { email } = this.state;
    // event.preventDefault();
    saveUser(email);
    history.push('/carteira');
  }

  validateLogin = () => {
    const { email, password } = this.state;
    const spec = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    const NUM = 5; // só existe para evitar o problema de número magico
    if (spec.test(email) && password.length > NUM) {
      return this.setState({ isLoginDisabled: false });
    }
    return this.setState({ isLoginDisabled: true });
  }

  render() {
    const { email, password, isLoginDisabled } = this.state;
    return (
      <form>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Insira seu email"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
            required
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Insira sua senha"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
            required
            autoComplete="on" // está aqui pra corrigir o aviso no console
          />
        </label>

        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isLoginDisabled }
          onClick={ this.handleCLick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

// dispatch que envia o email para a action( step-1)
const mapDispatchToProps = (dispatch) => ({
  saveUser: (email) => (
    dispatch(saveUserAction(email))
  ),
});

LoginForm.propTypes = {
  history: PropTypes.shape,
  // history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  saveUser: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(LoginForm);

// Referências:
// https://react-redux.js.org/using-react-redux/connect-mapdispatch
//
