/* eslint-disable no-console */
import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../consts';
import {AuthorizationStatus} from '../../consts';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus,
  children: JSX.Element,
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  console.log(authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
