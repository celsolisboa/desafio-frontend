import React from 'react';

import logoMedium from '../assets/logo_medium.png';

const Header = () => (
  <div
    style={{
      background: 'transparent',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 1080,
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <figure className="image">
        <img src={logoMedium} alt="Celso Lisboa" />
      </figure>
      <button
        type="button"
        tabIndex="0"
        className="button is-rounded is-primary button-default button-rounded"
      >
        <p>Criar</p>
      </button>
    </div>
  </div>
);

export default Header;
