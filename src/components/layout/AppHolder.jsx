import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function AppHolder() {

  return (
    <div className="app-main-container flex bg-black bg-opacity-30">
      <div className="modal-container rounded-md bg-white w-full h-full">
        <div className="modal-header h-[65px]">
          <Navbar />
        </div>
        <div className="modal-body min-h-[600px] p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppHolder;
