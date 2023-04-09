import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

import "./Navbar.css";

const Navbar = (): JSX.Element => {
  const { logout } = useLogout();
  const { state } = useAuthContext();

  const handleClick = (): void => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <div className="tabs">
          <Link to="/">
            <h2>Home</h2>
          </Link>
          {state.user && (
            <Link to="/cities">
              <h2>Cities</h2>
            </Link>
          )}
        </div>
        <nav>
          {!state.user && (
            <div className="authentication">
              <Link to="/login">
                <h3>Login</h3>
              </Link>
              <Link to="/signup">
                <h3>Signup</h3>
              </Link>
            </div>
          )}

          {state.user && (
            <div className="authentication">
              <span>{state.user.email}</span>
              <Link to="/" onClick={handleClick}>
                <h3>Log out</h3>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
