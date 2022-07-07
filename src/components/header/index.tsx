import { useAppDispatch, useAppSelector } from "@hooks";
import { userSlice } from "@store";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      dispatch(
        userSlice.actions.userFetchingSuccess({
          user: jwtDecode(token as string),
        })
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = () => {
    dispatch(userSlice.actions.userLogout());
  };

  return (
    <header className="header">
      <div className="header__logo">
        VOI <br />
        CER <span>.</span>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <i className="fas fa-newspaper"></i> <span>Главная</span>
            </Link>
          </li>
          <li>
            <Link to="/polls">
              <i className="fas fa-poll-h"></i> <span>Голосования</span>
            </Link>
          </li>

          {!user ? (
            <>
              <li>
                <Link to="/register">
                  <i className="far fa-plus-square"></i>{" "}
                  <span>Регистрация</span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <i className="fas fa-sign-in-alt"></i> <span>Войти</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/create">
                  <i className="far fa-plus-square"></i> <span>Создать</span>
                </Link>
              </li>

              {/*               <li>
                <Link to="/me">
                  <i className="far fa-grin-beam"></i> <span>Вы</span>
                </Link>
              </li> */}

              <button className="header__logout" onClick={logout}>
                <i className="fas fa-door-closed"></i> <span>Выйти</span>
              </button>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
