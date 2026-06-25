import React, { useState } from 'react';
import { 
  BarChart3, BookOpen, Users, Settings, Plus, Star, Trash2, 
  RefreshCw, TrendingUp, DollarSign, Eye, ShieldAlert, Check, ChevronRight, HelpCircle
} from 'lucide-react';
import { MagazineIssue, AdminTab, AppView } from '../types';

interface AdminDashboardProps {
  issues: MagazineIssue[];
  onToggleStatus: (issueId: string) => void;
  onDeleteIssue: (issueId: string) => void;
  onAddIssueClick: () => void;
  onViewChange: (view: AppView) => void;
  onLogout: () => void;
}

interface MockSubscriber {
  id: string;
  email: string;
  tier: 'VIP Premium' | 'Basic Pass';
  dateAdded: string;
  status: 'Active' | 'Pending' | 'Canceled';
}

export default function AdminDashboard({ 
  issues, 
  onToggleStatus, 
  onDeleteIssue, 
  onAddIssueClick,
  onViewChange,
  onLogout
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [subscribers, setSubscribers] = useState<MockSubscriber[]>([
    { id: 'sub-1', email: 'jun.takahashi@undercover.jp', tier: 'VIP Premium', dateAdded: '2026-06-12', status: 'Active' },
    { id: 'sub-2', email: 'nigo@humanmade.com', tier: 'VIP Premium', dateAdded: '2026-06-18', status: 'Active' },
    { id: 'sub-3', email: 'kawakubo@garcons.fr', tier: 'VIP Premium', dateAdded: '2026-06-20', status: 'Active' },
    { id: 'sub-4', email: 'vanguard_fan_999@proton.me', tier: 'Basic Pass', dateAdded: '2026-06-21', status: 'Active' },
    { id: 'sub-5', email: 'futura.studios@cyber.net', tier: 'Basic Pass', dateAdded: '2026-06-22', status: 'Pending' }
  ]);
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubTier, setNewSubTier] = useState<'VIP Premium' | 'Basic Pass'>('VIP Premium');
  const [subFilter, setSubFilter] = useState<'All' | 'Active' | 'Pending'>('All');

  // Stats calculation
  const totalIssues = issues.length;
  const publishedIssues = issues.filter(i => i.status === 'Published').length;
  const draftIssues = issues.filter(i => i.status === 'Draft').length;

  // Manual subscriber submission
  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubEmail.trim() || !newSubEmail.includes('@')) return;
    const newSub: MockSubscriber = {
      id: `sub-${subscribers.length + 1}`,
      email: newSubEmail,
      tier: newSubTier,
      dateAdded: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    setSubscribers([newSub, ...subscribers]);
    setNewSubEmail('');
  };

  const handleDeleteSubscriber = (id: string) => {
    setSubscribers(subscribers.filter(sub => sub.id !== id));
  };

  // Simulated static data for beautiful analytics
  const engagementStats = [
    { label: 'MON', desk: 85, mob: 55 },
    { label: 'TUE', desk: 92, mob: 68 },
    { label: 'WED', desk: 110, mob: 80 },
    { label: 'THU', desk: 104, mob: 74 },
    { label: 'FRI', desk: 130, mob: 99 },
    { label: 'SAT', desk: 145, mob: 120 },
    { label: 'SUN', desk: 160, mob: 138 },
  ];

  return (
    <div id="editorial-cms-dashboard" className="min-h-screen bg-[#131313] text-white pt-24 pb-20 select-none">
      {/* Container Head */}
      <header className="border-b border-zinc-800 pb-6 px-6 md:px-[5vw] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c3f400] animate-ping" />
            <span className="font-mono text-xs text-[#c3f400] tracking-widest font-black uppercase">
              Vanguard Editorial Operations CMS
            </span>
          </div>
          <h2 className="font-serif font-black text-4xl md:text-6xl uppercase tracking-tighter italic leading-none">
            Platform Command
          </h2>
        </div>

        {/* Action Button */}
        <button 
          onClick={onAddIssueClick}
          className="cursor-pointer bg-[#c3f400] text-black px-6 py-3 font-mono text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 hover:bg-white transition-colors brutalist-shadow"
        >
          <Plus className="w-4 h-4" /> Assemble New Issue
        </button>
      </header>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 px-6 md:px-[5vw] mt-8 gap-8">
        
        {/* Navigation Sidebar */}
        <nav className="lg:col-span-3 space-y-2">
          {[
            { id: 'dashboard', label: 'METRICS OVERVIEW', icon: BarChart3 },
            { id: 'content', label: 'ISSUE MANAGER', icon: BookOpen },
            { id: 'subscribers', label: 'AUDIENCE & MEMBERS', icon: Users },
            { id: 'settings', label: 'CMS INTEGRATION', icon: Settings },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`w-full flex items-center justify-between py-4 px-4 border text-left font-mono text-xs transition-all tracking-wider ${
                  isActive 
                    ? 'bg-white text-black font-extrabold border-white' 
                    : 'border-zinc-850 hover:bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1' : ''}`} />
              </button>
            );
          })}

          <div className="pt-6 border-t border-zinc-900 mt-6 bg-zinc-950/40 p-4 border border-zinc-900">
            <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1">Authenticated Editor</span>
            <span className="font-mono text-xs text-[#c3f400] font-bold block">admin@vanguard.editorial</span>
            <button 
              onClick={() => { onViewChange('public'); }}
              className="mt-4 w-full border border-zinc-800 hover:border-white py-2 text-center font-mono text-[11px] text-zinc-400 hover:text-white uppercase transition-colors"
            >
              Back to Public Hub
            </button>
            <button 
              onClick={onLogout}
              className="mt-2 w-full border border-zinc-800 hover:border-red-500 py-2 text-center font-mono text-[11px] text-zinc-400 hover:text-red-500 uppercase transition-colors"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Active Tab View Panel */}
        <section className="lg:col-span-9 bg-zinc-950/60 border border-zinc-850 p-6 md:p-8">
          
          {/* Dashboard Metric Overview */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <span className="font-mono text-[11px] text-[#c3f400] font-black uppercase tracking-[0.25em]">
                LIVE AUDIENCE ENGAGEMENT INDEX
              </span>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-zinc-800 p-6 bg-[#131313]/90">
                  <div className="flex justify-between items-start text-zinc-500 mb-4">
                    <span className="font-mono text-xs uppercase tracking-wider">Paid Subscribers</span>
                    <Users className="w-4 h-4 text-[#c3f400]" />
                  </div>
                  <h3 className="font-mono text-5xl md:text-6xl font-black text-white tracking-tighter leading-none my-1">
                    {subscribers.length + 158}
                  </h3>
                  <div className="mt-2 text-xs font-mono text-[#c3f400] flex items-center justify-between uppercase">
                    <span>Active members</span>
                    <span className="text-[#c3f400] font-extrabold">+18.5% MONTHLY</span>
                  </div>
                </div>

                <div className="border border-zinc-800 p-6 bg-[#131313]/90">
                  <div className="flex justify-between items-start text-zinc-500 mb-4">
                    <span className="font-mono text-xs uppercase tracking-wider">Estimated Revenue</span>
                    <DollarSign className="w-4 h-4 text-[#c3f400]" />
                  </div>
                  <h3 className="font-mono text-5xl md:text-6xl font-black text-[#c3f400] tracking-tighter leading-none my-1">
                    $1,480.50
                  </h3>
                  <div className="mt-2 text-xs font-mono text-zinc-400 flex items-center justify-between uppercase">
                    <span>Zine purchases</span>
                    <span className="text-[#c3f400] font-extrabold">+12.2% PEAK</span>
                  </div>
                </div>

                <div className="border border-zinc-800 p-6 bg-[#131313]/90">
                  <div className="flex justify-between items-start text-zinc-500 mb-4">
                    <span className="font-mono text-xs uppercase tracking-wider">Active Ingress Views</span>
                    <Eye className="w-4 h-4 text-[#c3f400]" />
                  </div>
                  <h3 className="font-mono text-5xl md:text-6xl font-black text-white tracking-tighter leading-none my-1">
                    28,419
                  </h3>
                  <div className="mt-2 text-xs font-mono text-zinc-400 flex items-center justify-between uppercase">
                    <span>Global Page hits</span>
                    <span className="text-zinc-500 font-extrabold">2.4m API LOADS</span>
                  </div>
                </div>
              </div>

              {/* Engagement Bar Chart via custom interactive styled vectors */}
              <div className="border border-zinc-850 p-6 bg-[#131313]">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="font-mono text-sm text-white uppercase font-bold">DEVICE ENGAGEMENT DISTRIBUTION</h4>
                    <p className="font-sans text-xs text-zinc-500 tracking-wider">Cumulative hourly reader sessions spanning past week</p>
                  </div>
                  <div className="flex gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-white block" /> DESKTOP</div>
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#c3f400] block" /> MOBILE</div>
                  </div>
                </div>

                {/* Graph Area */}
                <div className="space-y-5">
                  {engagementStats.map((item, id) => (
                    <div key={id} className="grid grid-cols-12 items-center gap-4">
                      <span className="col-span-1 font-mono text-xs text-zinc-500 font-bold">{item.label}</span>
                      <div className="col-span-11 space-y-1">
                        {/* Desktop bar */}
                        <div className="relative h-2.5 bg-zinc-900 border border-zinc-850">
                          <div 
                            className="absolute top-0 left-0 bottom-0 bg-white transition-all duration-1000" 
                            style={{ width: `${(item.desk / 200) * 100}%` }}
                          />
                        </div>
                        {/* Mobile bar */}
                        <div className="relative h-2.5 bg-zinc-900 border border-zinc-850">
                          <div 
                            className="absolute top-0 left-0 bottom-0 bg-[#c3f400] transition-all duration-1000" 
                            style={{ width: `${(item.mob / 200) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic distribution list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="border border-zinc-850 p-5 bg-zinc-950/40">
                  <h4 className="font-mono text-xs text-[#c3f400] pb-2 border-b border-zinc-900 mb-3 font-extrabold">TOP STYLE SECTORS</h4>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between"><span>TOKYO (SHIBUYA)</span> <span className="font-bold">42% (STEREOTYPE)</span></div>
                    <div className="flex justify-between text-zinc-400"><span>BERLIN (COCKPIT)</span> <span className="font-bold">29% (INDUSTRIAL)</span></div>
                    <div className="flex justify-between text-zinc-400"><span>PARIS (CHROME)</span> <span className="font-bold">21% (EXPERIMENTAL)</span></div>
                    <div className="flex justify-between text-zinc-500"><span>SEOUL (SYNTHETIC)</span> <span className="font-bold">8% (BIO-FUTURE)</span></div>
                  </div>
                </div>

                <div className="border border-zinc-850 p-5 bg-zinc-950/40 flex flex-col justify-between">
                  <div>
                    <h4 className="font-mono text-xs text-white pb-2 border-b border-zinc-900 mb-3 font-extrabold uppercase">ACTIVE PLATFORM SYSTEMS</h4>
                    <p className="font-sans text-xs text-zinc-450 leading-relaxed">
                      All edge CDNs are reporting optimal file loading rates. Server static asset build generated perfectly on host <code>0.0.0.0:3000</code>.
                    </p>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase mt-4">
                    EST SECURITY DEPLOYED: LEVEL 10
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Issue Manager */}
          {activeTab === 'content' && (
            <div className="space-y-6 animate-fade-in text-zinc-250">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
                <div>
                  <span className="font-mono text-[11px] text-[#c3f400] font-black uppercase tracking-widest block">Issue Manager Portal</span>
                  <h3 className="font-serif text-3xl font-black text-white mt-1.5 uppercase italic tracking-tighter leading-none">CURRENT ISSUES ({issues.length})</h3>
                </div>
                <button 
                  onClick={onAddIssueClick}
                  className="font-mono text-xs text-black bg-[#c3f400] font-extrabold px-3 py-1.5 hover:bg-white transition-colors flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> NEW ISSUE
                </button>
              </div>

              {/* Table list */}
              <div className="space-y-4">
                {issues.map((issue) => (
                  <div 
                    key={issue.id} 
                    className="border border-zinc-800 bg-[#131313]/90 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-[#c3f400]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-20 bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0">
                        <img className="w-full h-full object-cover" src={issue.coverUrl} alt="Magazine Cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-mono text-[10px] text-zinc-500 font-extrabold uppercase bg-black px-2 py-0.5">
                            ISSUE {issue.issueNumber}
                          </span>
                          {issue.category && (
                            <span className="font-mono text-[9px] text-zinc-400 uppercase bg-zinc-900 px-2 py-0.5">
                              {issue.category}
                            </span>
                          )}
                          <span className={`font-mono text-[9px] px-2 py-0.5 font-bold uppercase ${
                            issue.status === 'Published' ? 'bg-[#c3f400]/20 text-[#c3f400]' : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {issue.status}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg font-bold text-white uppercase">{issue.title}</h4>
                        <p className="font-mono text-[10px] text-zinc-500 uppercase">{issue.releaseDate} // {issue.audience || "0"} reads</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      <button 
                        onClick={() => onToggleStatus(issue.id)}
                        className="font-mono text-[11px] uppercase border border-zinc-850 px-3 py-1.5 text-zinc-400 hover:text-white hover:border-[#c3f400] transition-colors"
                        title="Toggle Publishing Status (Published/Draft)"
                      >
                        CHANGE STATE
                      </button>
                      <button 
                        onClick={() => onDeleteIssue(issue.id)}
                        className="p-2 border border-zinc-850 text-zinc-500 hover:text-red-400 hover:border-red-400 transition-all rounded-none"
                        title="Delete Zine Issue"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-950 p-4 border border-zinc-900 flex gap-3 text-zinc-500 items-start">
                <HelpCircle className="w-6 h-6 text-[#c3f400] flex-shrink-0 mt-0.5" />
                <p className="font-mono text-[10px] uppercase leading-relaxed">
                  TIP: Adding dynamic issues will list them instantly in "The Archive" section on the front page. Readers can immediately engage in interactive reading.
                </p>
              </div>
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === 'subscribers' && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-zinc-900">
                <span className="font-mono text-[11px] text-[#c3f400] font-black uppercase tracking-widest block">Subscriber Operations</span>
                <h3 className="font-serif text-3xl font-black text-white mt-1.5 uppercase italic tracking-tighter leading-none">AUDIENCE MANAGEMENT</h3>
              </div>

              {/* Add Subscriber Form */}
              <form onSubmit={handleAddSubscriber} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-[#131313] p-4 border border-zinc-850">
                <div className="md:col-span-6">
                  <label className="block font-mono text-[10px] text-zinc-450 uppercase mb-1">Subscriber Email</label>
                  <input 
                    type="email"
                    required
                    value={newSubEmail}
                    onChange={(e) => setNewSubEmail(e.target.value)}
                    placeholder="E.G. VIRGIL@OFF---WHITE.NET"
                    className="w-full bg-[#0e0e0e] border border-zinc-800 text-white font-mono text-xs px-3 py-2.5 focus:outline-none focus:border-[#c3f400] uppercase"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block font-mono text-[10px] text-zinc-450 uppercase mb-1">Access Tier</label>
                  <select 
                    value={newSubTier}
                    onChange={(e) => setNewSubTier(e.target.value as 'VIP Premium' | 'Basic Pass')}
                    className="w-full bg-[#0e0e0e] border border-zinc-800 text-white font-mono text-xs px-2 py-2.5 focus:outline-none focus:border-[#c3f400] uppercase font-bold"
                  >
                    <option value="VIP Premium">VIP Premium</option>
                    <option value="Basic Pass">Basic Pass</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <button 
                    type="submit"
                    className="w-full bg-[#c3f400] text-black font-mono text-xs font-black uppercase py-2.5 hover:bg-white transition-colors"
                  >
                    Add Member
                  </button>
                </div>
              </form>

              {/* Subscriber List Table */}
              <div className="border border-zinc-850 bg-[#131313] overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-850 text-zinc-500 uppercase">
                      <th className="p-4">EMAIL ADDRESS</th>
                      <th className="p-4">MEMBERSHIP</th>
                      <th className="p-4">DATE INDEXED</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-zinc-900 hover:bg-zinc-950/60">
                        <td className="p-4 text-white uppercase">{sub.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-none text-[9px] font-bold uppercase ${
                            sub.tier === 'VIP Premium' ? 'bg-[#c3f400] text-black' : 'bg-zinc-800 text-zinc-300'
                          }`}>
                            {sub.tier}
                          </span>
                        </td>
                        <td className="p-4 text-zinc-400">{sub.dateAdded}</td>
                        <td className="p-4 text-zinc-400">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400]" />
                            {sub.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                            title="Remove subscriber account"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in text-zinc-350">
              <div className="pb-4 border-b border-zinc-900">
                <span className="font-mono text-[11px] text-[#c3f400] font-black uppercase tracking-widest block">Core Configurations</span>
                <h3 className="font-serif text-3xl font-black text-white mt-1.5 uppercase italic tracking-tighter leading-none">SYSTEM SETTINGS</h3>
              </div>

              <div className="space-y-4">
                <div className="border border-zinc-850 p-5 bg-[#131313]/50">
                  <h4 className="font-serif text-xl font-bold text-[#c3f400] uppercase mb-2 italic tracking-tight">PROMPTS & METRICS API</h4>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-4">
                    The platform is set up with server-side AI integration ready. Change active API routes or configure environment flags.
                  </p>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center py-2 border-b border-zinc-900">
                      <span>Vite Reverse Proxy Address</span>
                      <code className="bg-black text-[#c3f400] px-2 py-0.5 font-bold">http://localhost:3000</code>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-900">
                      <span>Server-Side Gemini API Status</span>
                      <span className="text-[#c3f400] font-bold">READY (Lazy-Load Protocol)</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>Theme System</span>
                      <span className="text-white">Brutalist Dark (Active Class Override)</span>
                    </div>
                  </div>
                </div>

                <div className="border border-zinc-850 p-5 bg-[#131313]/50">
                  <h4 className="font-serif text-xl text-white font-black uppercase mb-2 italic tracking-tight">CMS BACKUP KEYS</h4>
                  <p className="font-sans text-xs text-zinc-400 mb-4 leading-relaxed">
                    Backup or clear mock database local state stored inside the browser localStorage memory registers. This will restore original default issues (Issue 048, Neon Void, Concrete Jungle).
                  </p>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('vanguard_issues');
                      window.location.reload();
                    }}
                    className="bg-zinc-900 border border-zinc-850 text-white font-mono text-xs font-bold px-4 py-2 hover:bg-white hover:text-black transition-colors"
                  >
                    Reset CMS Database Local Storage
                  </button>
                </div>
              </div>
            </div>
          )}

        </section>
      </div>
    </div>
  );
}
