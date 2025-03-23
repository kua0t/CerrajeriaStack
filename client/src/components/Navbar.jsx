import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import { SearchInput } from "./ui/SearchInput";
import addClient from "../assets/addClient.png";
import logoutIcon from "../assets/logout.png";
import homeIcon from "../assets/home.png";
import loginIco from "../assets/login.png";
import React, { useState } from "react";

export function Navbar({ onSearch }) {
  const { isAuthenticated, logout, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <nav className="bg-blue-900 my-3 flex justify-between px-10 rounded-lg items-center max-[500px]:justify-center">
      <Link to={isAuthenticated ? "/client" : "/"}>
        <img
          src={homeIcon}
          alt=""
          className="w-14 max-[500px]:mr-5 max-[320px]:w-10"
        />
      </Link>
      <ul className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            <li className="text-2xl mr-7 max-[500px]:hidden">
              Bienvenido {user.username}
            </li>
            <li>
              <ButtonLink to="/add-client">
                <img
                  src={addClient}
                  alt=""
                  className="w-12 mr-5 max-[320px]:w-9"
                />
              </ButtonLink>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                <img src={logoutIcon} alt="" className="w-12 max-[320px]:w-9" />
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
