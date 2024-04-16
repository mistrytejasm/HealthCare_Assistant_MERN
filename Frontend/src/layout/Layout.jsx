import React from 'react'

import Header from 'D:/HealthCare Assistant/Frontend/src/components/Header/header';
import Footer from 'D:/HealthCare Assistant/Frontend/src/components/Footer/Footer';
import Routers from '../routes/Routers';

const Layout = () => {
  return (
    <>
    <Header />
    <main>
      <Routers />
    </main>
    <Footer />
    </>
  );
};

export default Layout