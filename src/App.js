import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './routes/ProtectedRoute';
import { selectToken } from "./redux/features/tokenSlice";
import { useSelector } from 'react-redux';
import ConfirmPage from './pages/ConfirmPage';
import ThanksPage from './pages/ThanksPage';

function App() {
  let token = useSelector(selectToken);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute isAllowed={token.token != null} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route element={<ProtectedRoute redirectPath='/' isAllowed={token.token == null} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="/links/:productName/:refferalCode" element={<ConfirmPage />} />
          <Route path="/thanks" element={<ThanksPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default App;
