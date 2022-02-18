import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';

function NotFoundScreen(): JSX.Element {
  return (
    <section>404 NOT FOUND
      <Link to={AppRoute.Root}>Вернуться на главную</Link>
    </section>
  );
}

export default NotFoundScreen;
