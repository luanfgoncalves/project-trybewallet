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
    const NUM = 5; // só existe para evitar o problema de número magico
    const { email, password } = this.state;
    const { name, value } = target;
    this.setState({ [name]: value });
    if (email.length > 0 && password.length > NUM) {
      this.setState({ isLoginDisabled: false });
    } else {
      this.setState({ isLoginDisabled: true });
    }
  }

  handleCLick = () => {
    const { history } = this.props;
    this.setState({});
    history.push('/carteira');
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
            autoComplete="on" // está aqui pra corrigir o aviso no console
          />
        </label>

        <button
          type="submit"
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
  history: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(LoginForm);

// Referência: https://react-redux.js.org/using-react-redux/connect-mapdispatch
