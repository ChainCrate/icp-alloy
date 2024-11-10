import { MetaMaskProvider } from 'metamask-react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
// import HomePage from './pages/HomePage';
import VerifyPage from './pages/VerifyPage';
import LandingPage from './pages/Landing';
import VaultsGrid from './pages/Vaults';

import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'twin.macro';
import '../setupApp';
import '../styles/index.scss';

export default function App() {
  return (
    <MetaMaskProvider>
      <ToastContainer position="bottom-right" />
      <Router>
        <div tw=" w-full min-h-screen overflow-x-hidden">
          <Navbar />
          <div tw="h-full mx-auto p-2 sm:p-4">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/vaults" element={<VaultsGrid />} />
              {/* <Route path="/" element={<HomePage />} /> */}
              <Route path="/verify" element={<VerifyPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </MetaMaskProvider>
  );
}
