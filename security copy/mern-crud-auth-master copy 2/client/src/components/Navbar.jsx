import { Link } from "react-router-dom";

import { useAuth } from "../context/authContext";

import { ButtonLink } from "./ui/ButtonLink";
import { SearchInput } from "./ui/SearchInput";

import addClient from "../assets/addClient.png";
import logoutIcon from "../assets/logout.png";
import homeIcon from "../assets/home.png";
import loginIco from "../assets/login.png";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-blue-900 my-3 flex justify-between px-10 rounded-lg items-center">
      <Link to={isAuthenticated ? "/client" : "/"}>
        <img src={homeIcon} alt="" className="w-16" />
      </Link>
      {isAuthenticated ? <SearchInput /> : ""}
      <ul className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            <li className="text-2xl mr-7">Bienvenido {user.username}</li>
            <li>
              <ButtonLink to="/add-client">
                <img src={addClient} alt="" className="w-12 mr-5" />
              </ButtonLink>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                <img src={logoutIcon} alt="" className="w-12" />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">
                <img className="w-14" src={loginIco} alt="" />
              </ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
