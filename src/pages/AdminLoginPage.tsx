import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowLeft, Key } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AdminLoginPage: React.FC = () => {
  const { adminLogin, setCurrentPage, brandConfig } = useStore();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(password);
    if (success) {
      setCurrentPage('admin-dashboard');
    } else {
      setErrorMessage('Invalid administrative key. Hint: use "antique123" or "admin123"');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#FAF7F2] border border-[#E0D3BC] p-8 sm:p-10 rounded-xs shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#1E1915] text-[#D4AF37] flex items-center justify-center border border-[#3E3228]">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#947432] font-semibold block">
            Protected Management Portal
          </span>
          <h1 className="font-serif text-2xl text-[#1E1915]">
            {brandConfig.brandName} Admin
          </h1>
          <p className="text-xs text-[#7A6959]">
            Restricted access for atelier managers and store curators.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#4E3F32] mb-1">
              Store Master Security Key
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 w-4 h-4 text-[#9E8E7D]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Enter admin password (e.g. antique123)"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D5C9B8] rounded-xs text-xs text-[#1E1915] focus:outline-none focus:border-[#947432]"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-2.5 bg-[#FDF2F2] border border-[#E8C4C4] text-xs text-[#A02824] rounded-xs">
              {errorMessage}
            </div>
          )}

          <div className="p-2.5 bg-[#F2EDE1] border border-[#DFD3BE] rounded-xs text-[11px] text-[#6B5A4B] space-y-0.5">
            <span className="font-semibold block text-[#1E1915]">Default Access Credentials:</span>
            <span>Key: <code className="font-mono bg-white px-1 py-0.5 rounded text-[#8B6520]">antique123</code> or <code className="font-mono bg-white px-1 py-0.5 rounded text-[#8B6520]">admin123</code></span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1E1915] hover:bg-[#382F27] text-white text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Authenticate &amp; Access Dashboard</span>
          </button>
        </form>

        <div className="pt-2 text-center border-t border-[#EAE0CF]">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-xs text-[#7A6959] hover:text-[#1E1915] inline-flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer Storefront</span>
          </button>
        </div>

      </div>
    </div>
  );
};
