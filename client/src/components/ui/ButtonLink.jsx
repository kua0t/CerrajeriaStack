import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="px-4 py-1">
    {children}
  </Link>
);
