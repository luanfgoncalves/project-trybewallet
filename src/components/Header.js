import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>

        <span data-testid="email-field">
          { email }
        </span>

        <span data-testid="total-field">
          { total }
        </span>

        <span data-testid="header-currency-field">
          BRL
        </span>

      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  total: globalState.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);

// Organização
// 1- recuperar via props as expenses
// 2-
//
//
