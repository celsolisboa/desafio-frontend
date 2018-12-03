import React from 'react';

import logoMedium from '../assets/logo_medium.png';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.state.showModal,
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  showModal = () => {
    this.setState({
      showModal: !this.showModal,
    });
  };

  render() {
    return (
      <div className="header">
        <div className="header-itens">
          <figure className="image">
            <img src={logoMedium} alt="Celso Lisboa" />
          </figure>
          <button
            type="button"
            tabIndex="0"
            className="button is-rounded is-primary button-default button-rounded"
          >
            <p onClick={this.showModal}>Criar</p>
          </button>
        </div>
      </div>
    );
  }
}
