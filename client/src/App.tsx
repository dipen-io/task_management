import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Home";
import SignupPage from "./pages/SignupPage";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
