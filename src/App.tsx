import { Dispatch, SetStateAction, useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
// Theme
import { CssBaseline } from '@mui/material';
// Components
import NotFound from "./views/404/NotFound";
import Header from "./components/navigation/Header";
import useDynamicWeb3Hook from './abstraction/hooks/DynamicWeb3Hook';
import DashBoard from "./views/Dashboard/DashBoard";


interface AppProps {
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

function App({ setDarkMode }: AppProps) {

  const { initialize } = useDynamicWeb3Hook()

  useEffect(() => {
    initialize();
  })

  return (
    <>
      <CssBaseline />
      <div style={{ height: '5vh' }}>
        <Header setDarkMode={setDarkMode} />
      </div>
      <div style={{ height: '95vh' }}>
        <Routes>
          {/* Redirect user from index page to NFT redeem page */}
          <Route
            path="/"
            element={<Navigate to="/dashboard" />}
          />

          {/* All existing app routes */}
          <Route path="/dashboard" element={<DashBoard />} />

          {/* If not match is found return 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </div>

    </>
  );
}

export default App;
