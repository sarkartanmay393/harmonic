
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-full bg-background flex flex-col">
      <Header />
      <main className="flex-1 w-full mx-auto">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout;
