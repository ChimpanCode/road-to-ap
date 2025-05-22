import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  return (
    <nav>
      <span className="app-title">
        Road to AP
      </span>
      <div className="nav-links">
        <Link to="/">機能1（ホーム）</Link>
        <Link to="/quiz">機能2（用語クイズ）</Link>
        <Link to="/verbalize">機能3（用語の言語化）</Link>
        <Link to="/">機能4（学習管理）</Link>
      </div>
      <span className="">
        <Link to="/login">ログイン</Link>
      </span>
    </nav>
  );
};

export default Navbar;
