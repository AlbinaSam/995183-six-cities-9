import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';

function NotFoundScreen(): JSX.Element {
  return (
    <section style={{textAlign:'center'}}>
      <h1>404 NOT FOUND</h1>
      <p><Link to={AppRoute.Root}>Вернуться на главную</Link></p>
    </section>
  );
}

export default NotFoundScreen;
