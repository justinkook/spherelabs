import React from 'react';

import FollowBar from "@/components/layout/FollowBar"
import Sidebar from "@/components/layout/Sidebar"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-full bg-white">
          <Sidebar />
            {children}
          <FollowBar />
    </div>
  )
}

export default Layout;
