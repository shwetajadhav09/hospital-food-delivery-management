import React, { useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('login');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {activeTab === 'login' ? 'Login' : 'Sign Up'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${
              activeTab === 'login' ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 ${
              activeTab === 'signup' ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>
        {activeTab === 'login' ? <LoginForm onClose={onClose} /> : <SignupForm onClose={onClose} />}
      </div>
    </div>
  );
}

