import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'


// 外部関数のインポート
import Home from './components/Home';
import Navbar from './components/Navbar';
import Verbalization from './components/verbalization_mode/Verbalization';
import Login from './components/Login';
import Quiz from './components/quiz_mode/Quiz';


function App() {
  //ブラウザ更新時にログインをいちいちしなくて済むようにログインの状態をステートとして記録
  //const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  

  return (
    <Router>
      <div>
        {/* ナビゲーションメニュー */}
        <Navbar></Navbar>

        {/* ルーティング設定 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/verbalize" element={<Verbalization />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
