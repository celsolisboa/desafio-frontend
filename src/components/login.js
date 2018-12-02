import React from 'react';
import axios from 'axios';
import { navigate } from 'gatsby';

import logoBig from '../assets/logo_big.png';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      error: false,
    };
  }

  componentDidMount() {}

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleChangePass = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    if (!user.email || !user.password) {
      this.setState({ error: true });
      return;
    }

    axios
      .post(`http://localhost:3000/api/user/login`, { ...user })
      .then(() => {
        navigate('/cursos', { state: { isLoggedIn: true } });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  render() {
    const error = this.state.error;
    return (
      <section className="section">
        <div className="container theme-default login-page">
          <figure className="image is-96x96">
            <img src={logoBig} alt="Celso Lisboa" />
          </figure>
          <h1 className="has-text-centered">Login</h1>
          <div className="login-itens">
            <input
              onChange={this.handleChangeEmail}
              className="input is-medium input-default"
              type="email"
              placeholder="Email"
            />
            <input
              onChange={this.handleChangePass}
              className="input is-medium input-default"
              type="password"
              placeholder="Senha"
            />
            <button
              type="button"
              onClick={this.handleSubmit}
              tabIndex="0"
              className="button is-medium is-primary is-fullwidth button-default"
            >
              <p>Acessar</p>
            </button>
            <p className={error ? 'help has-text-centered' : 'is-invisible'}>
              Algo deu errado, tente novamente.
            </p>
          </div>
        </div>
      </section>
    );
  }
}
