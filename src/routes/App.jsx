import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import AuthContext from '@context/AuthContext';
import ToasterContext from '@context/ToasterContext';
import useToasterState from '@hooks/useToasterState';
import Layout from '@containers/Layout';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';

import '@styles/global.scss';

const App = () => {
  const auth = useAuth();
  const toasterState = useToasterState();
  return (
    <AuthContext.Provider value={auth}>
      <ToasterContext.Provider value={toasterState}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ToasterContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;