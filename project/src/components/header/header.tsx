import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';
import HeaderNavNoAuth from '../header-nav-no-auth/header-nav-no-auth';
import HeaderNavAuth from '../header-nav-auth/header-nav-auth';
import { AuthorizationStatus } from '../../consts';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import {useAppSelector} from '../../hooks/index';
import { memo } from 'react';

function Header(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <header className="header" data-testid="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Root} data-testid="logo-link">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {authorizationStatus === AuthorizationStatus.Auth ? <HeaderNavAuth /> : <HeaderNavNoAuth />}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
