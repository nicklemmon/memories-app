import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Header.css';

import HeaderNav from '../HeaderNav';

class Header extends React.Component {
  render() {
    const { className, user } = this.props;

    return (
      <header className={classNames('Header', className)} data-cy="header">
        <span className="Header-user">{user && user.username}</span>

        <Link className="Header-brand" to="/">
          Eva's Memories
        </Link>

        <HeaderNav className="Header-nav" user={user} />
      </header>
    );
  }
}

export default Header;
