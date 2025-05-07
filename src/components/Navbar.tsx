import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        機能1（ホーム）
      </Link>
      <Link to="/quiz">
        機能2（用語クイズ）
      </Link>
      <Link to="/voice">
        機能3（用語の言語化）
      </Link>
    </nav>
  );
};

export default Navbar;
