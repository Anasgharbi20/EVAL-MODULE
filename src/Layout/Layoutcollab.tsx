import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import CollabHeader from '../components/CollabHeader';
import Footer from '../components/Footer';



const Layoutcollab: React.FC<any> = () => {
  return (
    <div>
      <CollabHeader />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Layoutcollab;
