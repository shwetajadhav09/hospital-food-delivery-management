import React, { useState } from 'react';
import { Users, ShoppingCart, Archive, X, LogIn, LogOut } from 'lucide-react';
import AuthModal from './AuthModel';

export default function Sidebar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tabs = [
    { id: 'patients', name: 'Patients', icon: Users },
    { id: 'foodInventory', name: 'Food Inventory', icon: ShoppingCart },
    { id: 'pantry', name: 'Pantry', icon: Archive },
  ];

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Add logout logic here
      setIsLoggedIn(false);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <aside className={`
        bg-gray-800 text-white w-64 min-h-screen p-4 flex-shrink-0
        fixed lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Heliverse</h1>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-gray-700"
              aria-label="Close Sidebar"
            >
              <X size={24} />
            </button>
          </div>
          <nav>
            <ul>
              {tabs.map((tab) => (
                <li key={tab.id} className="mb-2">
                  <button
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`flex items-center p-2 rounded-lg w-full ${
                      activeTab === tab.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="mr-3" />
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-auto">
          <button
              onClick={handleAuthClick}
            className="flex items-center p-2 rounded-lg w-full hover:bg-gray-700"
          >
            {isLoggedIn ? <LogOut className="mr-3" /> : <LogIn className="mr-3" />}
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </aside>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}

