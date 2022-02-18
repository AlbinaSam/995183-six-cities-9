import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';
import HeaderNavNoAuth from '../header-nav-no-auth/header-nav-no-auth';
//import HeaderNavAuth from '../header-nav-auth/header-nav-auth';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Root}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <HeaderNavNoAuth />
        </div>
      </div>
    </header>
  );
}

export default Header;
