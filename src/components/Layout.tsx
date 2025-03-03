
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout;
