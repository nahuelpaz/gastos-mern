import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`${collapsed ? 'ml-20' : 'ml-64'} p-6 w-full min-h-screen bg-gray-100 transition-all duration-300`}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
