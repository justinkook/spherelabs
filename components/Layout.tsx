import React from 'react';

import Sidebar from "@/components/layout/Sidebar"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-full bg-white">
          <Sidebar />
          {children}
    </div>
  )
}

export default Layout;
