import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  const location = useLocation(); // 現在のパスを取得

   // ナビリンクの情報
  const navLinks = [
    { to: "/", label: "ホーム" },
    { to: "/quiz", label: "機能1（用語クイズ）" },
    { to: "/verbalize", label: "機能2（用語の言語化）" },
    { to: "/studyLog", label: "機能3（学習管理）" },
  ];


  return (
    <nav>
      <span className="app-title">
        Road to AP
      </span>
      <div className="nav-links">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={location.pathname === link.to ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <span className="">
        <Link to="/login">ログイン</Link>
      </span>
    </nav>
  );
};

export default Navbar;
