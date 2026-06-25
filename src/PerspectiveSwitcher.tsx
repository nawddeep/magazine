import React, { useState } from 'react';
import { Layers, Activity, HelpCircle, Eye, ShieldAlert, Monitor, Sparkles } from 'lucide-react';
import { AppView } from './types';

interface PerspectiveSwitcherProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  activeIssueTitle?: string;
  onSeedMoreIssues?: () => void;
}

export default function PerspectiveSwitcher({ 
  currentView, 
  onViewChange, 
  activeIssueTitle,
  onSeedMoreIssues
}: PerspectiveSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] select-none text-white">
      {isOpen ? (
        <div className="bg-[#131313] border-2 border-[#c3f400] p-5 w-80 shadow-[6px_6px_0px_#000000] space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
            <span className="font-mono text-xs text-[#c3f400] font-black tracking-widest flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> PERSPECTIVE CONTROLS
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="font-mono text-xs text-zinc-500 hover:text-white"
            >
              [CLOSE]
            </button>
          </div>

          <p className="font-sans text-[11px] text-zinc-400 leading-relaxed">
            Toggle simulated user permissions and CMS editorial view modes:
          </p>

          <div className="space-y-2">
            {[
              { id: 'public', label: '1. Public Landing Hub', desc: 'Cover, Editors Picks, The Archive' },
              { id: 'slider', label: `2. Immersive Reader (${activeIssueTitle || 'Standard'})`, desc: 'Full-screen slide paginator & lock filters' },
              { id: 'admin', label: '3. Platform CMS Command', desc: 'Stats dashboard, Issue Manager, subscribers list' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'admin') {
                    // Navigate to admin login page
                    window.location.pathname = '/admin/login';
                  } else {
                    onViewChange(item.id as AppView);
                  }
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2 border font-mono text-xs transition-colors ${
                  currentView === item.id 
                    ? 'border-[#c3f400] bg-[#c3f400]/10 text-[#c3f400] font-bold' 
                    : 'border-zinc-850 hover:bg-zinc-900 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Monitor className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </div>
                <span className="block text-[9px] text-zinc-500 mt-0.5 tracking-tight">{item.desc}</span>
              </button>
            ))}
          </div>

          {onSeedMoreIssues && (
            <button
              onClick={() => {
                onSeedMoreIssues();
                setIsOpen(false);
              }}
              className="w-full bg-[#c3f400] text-black font-mono text-[10px] font-black uppercase py-2.5 hover:bg-white transition-colors"
            >
              Seed More Issues + Subscribers
            </button>
          )}

          <div className="pt-2 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase space-y-1">
            <div className="flex justify-between">
              <span>Nginx Edge ingress</span> <span className="text-[#c3f400]">Port 3000</span>
            </div>
            <div className="flex justify-between">
              <span>Persistence status</span> <span className="text-white">localStorage ACTIVE</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black text-white hover:text-black hover:bg-[#c3f400] border-2 border-white hover:border-[#c3f400] p-3 flex items-center justify-center gap-2 font-mono text-xs uppercase font-extrabold shadow-[4px_4px_0px_#000500] transition-all duration-300 transform hover:-translate-x-1 hover:-translate-y-1"
        >
          <Layers className="w-4 h-4 animate-spin-slow" /> Perspective Switcher
        </button>
      )}
    </div>
  );
}
