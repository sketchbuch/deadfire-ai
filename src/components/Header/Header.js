import React, { Component } from 'react';
import mainLogo from './logo.png';
import './Header.css';

type Props = {
};

export class Header extends Component<Props> {
  props: Props;

  render() {
    return (
      <header className="Header">
        <img className="Header__logo" alt="" src={mainLogo} />
        <h1 className="Header__title">Deadfire AI Editor</h1>
      </header>
    )
  }
}


export default Header;
