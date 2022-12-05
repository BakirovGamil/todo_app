import { Link } from 'react-router-dom';
import { useOptionsActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Search from './search/Search';

const Header = () => {
  const isVisibleMenu = useTypedSelector((state) => state.options.isVisibleMenu);
  const { setMenuVisibility } = useOptionsActions();

  const onToggleMenuVisibility = () => {
    setMenuVisibility(!isVisibleMenu);
  };

  return (
    <header className="header">
      <ul className="header__list">
        <li className="header__item">
          <button className="header__sideNavBtn" onClick={onToggleMenuVisibility}>
            ☰
          </button>
        </li>
        <li className="header__item header__logo">
          <Link to="/">
            TODO
          </Link>
        </li>
        <li className="header__item header__logo">
          <Search/>
        </li>
      </ul>
    </header>
  );
}

export default Header;