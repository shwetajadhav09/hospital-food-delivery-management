import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Patients from './components/Patients';
import FoodInventory from './components/FoodInventory';
import Pantry from './components/Pantry';
import Overview from './components/Overview';
import { Menu } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('patients');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'patients':
        return <Patients />;
      case 'foodInventory':
        return <FoodInventory />;
      case 'pantry':
        return <Pantry />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white border-b">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md lg:hidden hover:bg-gray-200"
            aria-label="Toggle Sidebar"
          >
            <Menu />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

