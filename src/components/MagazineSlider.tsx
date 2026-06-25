import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, Lock, Crown } from 'lucide-react';
import { MagazineIssue, AppView } from '../types';
import { useSubscription } from '../context/SubscriptionContext';

interface MagazineSliderProps {
  issue: MagazineIssue;
  onViewChange: (view: AppView) => void;
}

interface ZinePage {
  pageNumber: number;
  title: string;
  subtitle: string;
  p1: string;
  p2?: string;
  accentQuote?: string;
  imageUrl: string;
  accentColor?: string;
  isPremiumGate?: boolean;
}

export default function MagazineSlider({ issue, onViewChange }: MagazineSliderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const { isSubscribed, canAccessPage, openPremiumModal } = useSubscription();

  // Zine pages for specific issue (extended to demonstrate pagination)
  const zinePages: ZinePage[] = [
    {
      pageNumber: 1,
      title: issue.title,
      subtitle: `RELEASE CODE ${issue.issueNumber} // SPRING SECTOR V`,
      p1: "Vanguard Editorial returns with a visceral dive into modern responsive mechanics.",
      p2: issue.description || "The newest installment from Vanguard Editorial CMS detailing futuristic aesthetics.",
      imageUrl: issue.coverUrl,
      accentColor: '#c3f400'
    },
    {
      pageNumber: 2,
      subtitle: "EDITORIAL ESSAY // DEEP CHROME",
      title: "METALLIC TRANSCENDENCE",
      p1: "In the digital age, styling is no longer about fabric; it is about absolute refraction. We examine the rise of physical silver plating on street-level techwear garments in Paris and Tokyo.",
      accentQuote: "Chrome is not a material choice; it's a structural demand of high-frequency life.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDF4nv85a_WmyRC_2Ip2Wk55d_Kq3vou1slz9Us5OUMt-G6SphTCQGKSDyK-UqIZvnYudJ-mxyi1WPPW0W8sqZOS4hy9E2RBPuPDAXjTuIjLhY6l2yZu032OxM9ZLt-mjLeJcPu4ORLPzYkf5LU9y59NPSu-xWfCm1rj7_V1uI8pJm4cLQ6X2N-S5TQHVt923UemMpwediUuMemId7xURBOQpmsrkNZITslVG54C78vFMd8iNXJMgMv0-tTOjmc_wvwT1e066kZwNk",
      accentColor: '#ffffff'
    },
    {
      pageNumber: 3,
      subtitle: "REVOLUTION MATRIX // AGE OF CHROME",
      title: "CHROME DREAMS & INDUSTRIAL SURFACES",
      p1: "As urban architecture hardens under ecological strains, the wardrobe transitions into a shield. Dynamic materials adapt to atmospheric shifts, reflecting pollution while neutralizing environmental toxicity, creating a physical boundary between life and elements.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDF0bKIIp23lyR-OIduuctIOl3mhGYFrixa0z89IAuBPbz7IyJHqQ6RNTxolkvHa7hukRqzUpUYjClfjMpX5j5pc3jaCAMPa-fXbPYaVsPfCZjN7tnpYg8mbUIg_5qkH4PKUhrGLSkmt1_ee2YUdid1DmWS9KNwpgCGlaX3qMLAIHLuMIzuhloNoJl5P4k_f0ZatDCQ2PCVjV3gpeLblsP7FTPJEIDWJA-5d0-Lnl8T5PSiPbD-VxyeR_HKOdqslYzSPLSdFwVyeQs",
      accentColor: '#c3f400'
    },
    {
      pageNumber: 4,
      subtitle: "THE TOKYO SECTOR // URBAN GEOMETRIES",
      title: "SHIBUYA AFTER SHADOW SYSTEMS",
      p1: "Walking down the neon-lit alleyways of Shibuya, researchers uncovered the subterranean digital communities hosting decentralized fashion networks. Design files are traded like currencies, rendering production fully localized and independent.",
      p2: "Standard industrial machines are retrofitted for advanced laser weaving, rendering standard supply chains obsolete.",
      accentQuote: "They wanted cities to look like servers; we made sure they felt like temples instead.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuTHAysHBPhhxmQtvLIrFGRZXWC0xCIJf8yBULCgosTQHf_7eHpH0VLOyB2qjRhy4XWR1ygd9qTgIMZf8wJVPcpoG7u-7rkI7cRBj1qvubsGBaI8VPMvDlCYAg38WQWPIP4fS4QA5h-w6pxf9_ByNxv5I_QnfDuuitGihd7j_409mX7mmGWxhb0pdknDEXHn4KOL98bhXlvvIJWV8FDMadWWfW3MIsV69m_ndJvAdOM_s1QVZxfamIjhunZI8ip38Q1WEK2keFME8",
      accentColor: '#ffffff'
    },
    {
      pageNumber: 5,
      subtitle: "ARCHITECTURAL FUTURES // BRUTALIST REDUX",
      title: "CONCRETE POETRY IN MOTION",
      p1: "The return to brutalist principles in fashion mirrors our collective yearning for permanence in an ephemeral digital landscape. Raw concrete textures inform textile choices, creating garments that feel simultaneously ancient and futuristic.",
      accentQuote: "We don't wear clothes anymore; we inhabit architectures.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDF4nv85a_WmyRC_2Ip2Wk55d_Kq3vou1slz9Us5OUMt-G6SphTCQGKSDyK-UqIZvnYudJ-mxyi1WPPW0W8sqZOS4hy9E2RBPuPDAXjTuIjLhY6l2yZu032OxM9ZLt-mjLeJcPu4ORLPzYkf5LU9y59NPSu-xWfCm1rj7_V1uI8pJm4cLQ6X2N-S5TQHVt923UemMpwediUuMemId7xURBOQpmsrkNZITslVG54C78vFMd8iNXJMgMv0-tTOjmc_wvwT1e066kZwNk",
      accentColor: '#c3f400'
    },
    {
      pageNumber: 6,
      subtitle: "PREMIUM CONTENT // SUBSCRIBERS ONLY",
      title: "UNLOCK PREMIUM ACCESS",
      p1: "Continue reading this exclusive content by subscribing to Vanguard Premium. Get unlimited access to all magazines, full PDF downloads, and monthly editions.",
      imageUrl: issue.coverUrl,
      accentColor: '#c3f400',
      isPremiumGate: true
    },
    {
      pageNumber: 7,
      subtitle: "MATERIAL INNOVATIONS // SYNTHETIC FUTURES",
      title: "BEYOND TEXTILE BOUNDARIES",
      p1: "Lab-grown materials challenge traditional fashion hierarchies. Mycelium leather, spider silk proteins, and bio-fabricated textiles represent not just sustainability, but a fundamental reimagining of what clothing can be.",
      p2: "These materials possess properties impossible to achieve through conventional means: self-healing fabrics, temperature-responsive surfaces, and embedded biological sensors.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDF0bKIIp23lyR-OIduuctIOl3mhGYFrixa0z89IAuBPbz7IyJHqQ6RNTxolkvHa7hukRqzUpUYjClfjMpX5j5pc3jaCAMPa-fXbPYaVsPfCZjN7tnpYg8mbUIg_5qkH4PKUhrGLSkmt1_ee2YUdid1DmWS9KNwpgCGlaX3qMLAIHLuMIzuhloNoJl5P4k_f0ZatDCQ2PCVjV3gpeLblsP7FTPJEIDWJA-5d0-Lnl8T5PSiPbD-VxyeR_HKOdqslYzSPLSdFwVyeQs",
      accentColor: '#ffffff'
    },
    {
      pageNumber: 8,
      subtitle: "CULTURAL MOVEMENTS // GLOBAL THREADS",
      title: "DECENTRALIZED FASHION NETWORKS",
      p1: "From Lagos to Seoul, underground fashion collectives are bypassing traditional gatekeepers. Digital pattern files shared across borders enable local production of globally conceived designs, creating a truly democratized fashion ecosystem.",
      accentQuote: "The future of fashion is not manufactured; it's downloaded and fabricated locally.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuTHAysHBPhhxmQtvLIrFGRZXWC0xCIJf8yBULCgosTQHf_7eHpH0VLOyB2qjRhy4XWR1ygd9qTgIMZf8wJVPcpoG7u-7rkI7cRBj1qvubsGBaI8VPMvDlCYAg38WQWPIP4fS4QA5h-w6pxf9_ByNxv5I_QnfDuuitGihd7j_409mX7mmGWxhb0pdknDEXHn4KOL98bhXlvvIJWV8FDMadWWfW3MIsV69m_ndJvAdOM_s1QVZxfamIjhunZI8ip38Q1WEK2keFME8",
      accentColor: '#c3f400'
    }
  ];

  // Keypress listener (Left/Right to paginate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isSubscribed]);

  const handleNext = () => {
    const nextPage = currentPage + 1;
    
    if (nextPage < zinePages.length) {
      // Check if user can access the next page
      if (!canAccessPage(zinePages[nextPage].pageNumber)) {
        // Show premium modal when trying to access page 6 or beyond
        openPremiumModal();
      } else {
        setCurrentPage(nextPage);
      }
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (pageIndex: number) => {
    const targetPage = zinePages[pageIndex];
    
    // Check if user can access this page
    if (!canAccessPage(targetPage.pageNumber)) {
      // Show premium modal for locked pages
      openPremiumModal();
    } else {
      setCurrentPage(pageIndex);
    }
  };

  const activePage = zinePages[currentPage];

  return (
    <div id="immersive-zine-slider" className="fixed inset-0 z-[100] bg-[#0e0e0e] text-[#e5e2e1] flex flex-col md:flex-row select-none">
      {/* Navigation list on Left */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-zinc-900 bg-[#131313] p-6 flex flex-col justify-between">
        <div>
          <button 
            onClick={() => onViewChange('public')}
            className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 group font-mono text-xs uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c3f400] transition-colors"
          >
            <X className="w-4 h-4 transition-transform group-hover:rotate-90" /> Exit Reader Mode
          </button>

          <span className="font-mono text-[10px] text-[#c3f400] font-black uppercase tracking-widest bg-zinc-950 border border-zinc-800 px-3 py-1.5 inline-block mb-3">
            DIGITAL READING CONTAINER
          </span>
          <h2 className="font-serif font-black text-3xl uppercase tracking-tighter text-white mb-6 italic leading-none">
            {issue.title}
          </h2>

          {/* Directory */}
          <div className="space-y-4">
            {zinePages.map((page, idx) => {
              const isLocked = !canAccessPage(page.pageNumber);
              const isActive = currentPage === idx;
              
              return (
                <button 
                  key={idx}
                  disabled={isLocked}
                  onClick={() => handlePageClick(idx)}
                  className={`w-full flex items-center justify-between text-left py-2 px-3 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c3f400] ${
                    isActive
                      ? 'bg-[#c3f400] text-black font-bold' 
                      : isLocked
                        ? 'text-zinc-700 cursor-not-allowed font-mono text-xs opacity-50' 
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs">P. 0{page.pageNumber}</span>
                    <span className="font-serif text-sm truncate uppercase max-w-[130px]">{page.title}</span>
                  </div>
                  {isLocked && <Lock className="w-3.5 h-3.5 text-zinc-700" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Foot of page navigation detailing key instructions */}
        <div className="hidden md:block">
          <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest leading-relaxed">
            TIP: PRESS LEFT / RIGHT KEYS TO ANIMATE THE PHYSICAL CANVAS CARDS.
          </p>
        </div>
      </div>

      {/* Main active page viewport */}
      <div className="flex-grow relative bg-[#0e0e0e] flex flex-col justify-between p-6 md:p-12">
        {/* Top Header Information bar */}
        <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
          <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
            {activePage.subtitle}
          </span>
          <span className="font-mono text-xs text-[#c3f400] font-bold">
            PAGE 0{activePage.pageNumber} OF 0{zinePages.length}
          </span>
        </div>

        {/* Central Display Layout split into content and high-fashion image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center py-6">
          {activePage.isPremiumGate && !isSubscribed ? (
            // Premium Paywall Display on Page 6
            <div className="lg:col-span-12 flex flex-col items-center justify-center text-center space-y-8 py-12">
              <div className="w-24 h-24 bg-[#c3f400]/20 border-4 border-[#c3f400] flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(195,244,0,0.15)]">
                <Lock className="w-12 h-12 text-[#c3f400]" />
              </div>
              
              <div className="max-w-2xl space-y-4">
                <span className="font-mono text-xs text-[#c3f400] tracking-[0.3em] uppercase font-black block">
                  Premium Content Ahead
                </span>
                <h3 className="font-serif font-black text-5xl md:text-7xl text-white leading-[0.95] uppercase italic tracking-tighter">
                  {activePage.title}
                </h3>
                <p className="font-sans text-lg text-zinc-300 leading-relaxed max-w-xl mx-auto">
                  {activePage.p1}
                </p>
              </div>

              <button
                onClick={openPremiumModal}
                className="bg-[#c3f400] text-black font-mono text-sm font-black uppercase py-4 px-8 hover:bg-white transition-colors flex items-center gap-2 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c3f400] brutalist-shadow-hover border border-transparent hover:border-black"
              >
                <Crown className="w-5 h-5" />
                Unlock Premium Access
              </button>

              <div className="pt-8 border-t border-zinc-900 max-w-md">
                <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider leading-relaxed">
                  Subscribe to access {zinePages.length - 5} additional pages and unlock the complete editorial experience
                </p>
              </div>
            </div>
          ) : (
            // Regular Page Display
            <>
              <div className="lg:col-span-5 space-y-6">
                <h3 className="font-serif font-black text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] uppercase italic tracking-tighter font-extrabold">
                  {activePage.title}
                </h3>
                
                <p className="font-sans text-base md:text-lg text-zinc-300 leading-relaxed font-light">
                  {activePage.p1}
                </p>

                {activePage.p2 && (
                  <p className="font-sans text-sm text-zinc-500 leading-relaxed">
                    {activePage.p2}
                  </p>
                )}

                {activePage.accentQuote && (
                  <div className="border-l-4 border-[#c3f400] pl-6 italic my-8 bg-zinc-950/65 p-6 border border-zinc-900 rounded-none select-all animate-fade-in">
                    <p className="font-serif text-2xl md:text-3xl text-white font-semibold leading-snug">
                      "{activePage.accentQuote}"
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-7 h-[300px] md:h-[500px] bg-zinc-950 border border-zinc-800 shadow-2xl">
                <img 
                  className="w-full h-full object-cover grayscale select-none" 
                  alt={activePage.title}
                  src={activePage.imageUrl}
                />
              </div>
            </>
          )}
        </div>

        {/* Paginated Navigation buttons at the bottom */}
        <div className="flex justify-between items-center pt-4 border-t border-zinc-900">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 font-mono text-xs uppercase py-2 px-4 border border-zinc-800 rounded-none hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c3f400] ${
              currentPage === 0 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> REWIND
          </button>

          {isSubscribed && (
            <span className="font-mono text-[10px] text-[#c3f400] border border-[#c3f400] px-3 py-1 font-bold flex items-center gap-2">
              <Crown className="w-3 h-3" />
              PREMIUM MEMBER
            </span>
          )}

          <button 
            onClick={handleNext}
            disabled={currentPage === zinePages.length - 1}
            className={`flex items-center gap-2 font-mono text-xs uppercase py-2 px-4 border border-zinc-800 rounded-none hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c3f400] ${
              currentPage === zinePages.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            {!canAccessPage(zinePages[Math.min(currentPage + 1, zinePages.length - 1)].pageNumber) ? (
              <>
                UNLOCK PREMIUM <Lock className="w-4 h-4" />
              </>
            ) : (
              <>
                NEXT SECTION <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
