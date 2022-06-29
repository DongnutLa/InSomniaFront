import React, { useEffect, useContext } from 'react';
import Header from '@components/global/Header';
import AuthContext from '@context/AuthContext';
import ToasterContext from '@context/ToasterContext';
import Toaster from '@components/global/Toaster';

const Layout = ({ children }) => {
  const { getAuthData } = useContext(AuthContext);
  const { toasterStatus } = useContext(ToasterContext);
  useEffect(() => {
    getAuthData();
  }, [])

  return (
    <>
      <Header />
      {toasterStatus.visible && 
        <Toaster type={toasterStatus.type} content={toasterStatus.content} />
      }
      <main className="container">
        { children }
      </main>
    </>
  );
}

export default Layout;