import React, { useState, useRef } from 'react';
import { UploadCloud, Check, X, Sparkles, FolderOpen, AlertCircle, FileText } from 'lucide-react';
import { MagazineIssue } from '../types';

interface UploadIssueProps {
  onSaveIssue: (issue: MagazineIssue) => void;
  onCancel: () => void;
}

export default function UploadIssue({ onSaveIssue, onCancel }: UploadIssueProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Published' | 'Draft' | 'Archived'>('Published');
  const [audience, setAudience] = useState('0');

  // Curated list of magazine covers for instant click-to-select!
  const curatedCovers = [
    { name: 'RTC Magazine', url: '/covers/rtc-magazine.svg' },
    { name: 'Sadhana', url: '/covers/sadhana-magazine.svg' },
    { name: 'Ellenna', url: '/covers/ellenna-magazine.svg' }
  ];

  const [selectedCoverUrl, setSelectedCoverUrl] = useState(curatedCovers[0].url);
  const [customCoverUrl, setCustomCoverUrl] = useState('');

  // Drag and drop local file simulation
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [fileName, setFileName] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      startLoadingSimulation();
    }
  };

  const startLoadingSimulation = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Set to one of our curated ones randomly as simulated url fallback
          const rand = Math.floor(Math.random() * curatedCovers.length);
          setSelectedCoverUrl(curatedCovers[rand].url);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issueNumber.trim()) return;

    // Simulate progressive CMS rendering
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          const finalCover = customCoverUrl.trim() || selectedCoverUrl;
          
          const newIssue: MagazineIssue = {
            id: `issue-${Date.now()}`,
            title: title.toUpperCase(),
            category: category || 'General',
            issueNumber: issueNumber.padStart(3, '0'),
            releaseDate,
            coverUrl: finalCover,
            pageLimit: 4,
            description,
            status,
            views: '0',
            audience: '0',
            isCustom: true
          };

          onSaveIssue(newIssue);
          return 100;
        }
        return prev + 15;
      });
    }, 100);
  };

  return (
    <div id="cms-assembly-uploader" className="min-h-screen bg-[#131313] text-white pt-24 pb-20 select-none">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header bar */}
        <div className="flex justify-between items-center pb-6 border-b border-zinc-900 mb-8">
          <div>
            <span className="font-mono text-xs text-[#c3f400] font-bold uppercase tracking-widest block">
              Zine Compositor Center
            </span>
            <h2 className="font-serif font-black text-4xl md:text-6xl uppercase tracking-tighter mt-1 text-white italic leading-none">
              Assemble Issue
            </h2>
          </div>
          <button 
            onClick={onCancel}
            className="p-2 border border-zinc-850 hover:border-white text-zinc-500 hover:text-white transition-colors"
            title="Cancel uploading"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {uploadProgress >= 0 && uploadProgress < 100 ? (
          /* Satisfying progress feedback slider */
          <div className="border-4 border-[#c3f400] p-8 bg-[#131313] text-center space-y-6 shadow-[8px_8px_0px_#000000]">
            <UploadCloud className="w-12 h-12 text-[#c3f400] mx-auto animate-bounce" />
            <h3 className="font-serif text-3xl font-black uppercase text-white italic tracking-tighter leading-none font-extrabold">Assembling Core Files</h3>
            <p className="font-mono text-xs text-zinc-450 uppercase tracking-widest">
              Please wait while Vanguard Compiler compiles high-contrast visual layers...
            </p>
            <div className="h-6 bg-zinc-900 border-2 border-white relative overflow-hidden">
              <div 
                className="absolute top-0 bottom-0 left-0 bg-[#c3f400] transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-black text-black">
                {uploadProgress}% COMPILATION STATUS
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left side parameters */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[11px] text-theme-secondary uppercase mb-1">
                    Issue Title (Editorial Headline)
                  </label>
                  <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.G. DEEP SPACE REVOLT"
                    className="w-full bg-theme-input border border-theme-input text-theme font-serif font-bold text-lg px-4 py-3 focus:outline-none focus:border-[#c3f400] uppercase placeholder:text-theme-muted rounded-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-theme-secondary uppercase mb-1">
                    Category
                  </label>
                  <input 
                    type="text" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="E.G. Fashion & Culture, Technology, Lifestyle"
                    className="w-full bg-theme-input border border-theme-input text-theme font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#c3f400] placeholder:text-theme-muted rounded-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-theme-secondary uppercase mb-1">
                      Issue Number
                    </label>
                    <input 
                      type="number" 
                      required
                      value={issueNumber}
                      onChange={(e) => setIssueNumber(e.target.value)}
                      placeholder="049"
                      className="w-full bg-theme-input border border-theme-input text-theme font-mono text-xs px-4 py-3 focus:outline-none focus:border-[#c3f400] rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-theme-secondary uppercase mb-1">
                      Release Date
                    </label>
                    <input 
                      type="date" 
                      required
                      value={releaseDate}
                      onChange={(e) => setReleaseDate(e.target.value)}
                      className="w-full bg-theme-input border border-theme-input text-theme font-mono text-xs px-4 py-3 focus:outline-none focus:border-[#c3f400] rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-theme-secondary uppercase mb-1">
                    Audience Views
                  </label>
                  <input 
                    type="text" 
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="E.G. 4,200"
                    className="w-full bg-theme-input border border-theme-input text-theme font-mono text-xs px-4 py-3 focus:outline-none focus:border-[#c3f400] rounded-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-theme-secondary uppercase mb-1">
                    Editorial Digest / Synopsis Description
                  </label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Provide a detailed brief about style movements, Tokyo street features, or material syntheses."
                    className="w-full bg-theme-input border border-theme-input text-theme font-sans text-xs px-4 py-3 focus:outline-none focus:border-[#c3f400] leading-relaxed rounded-none placeholder:text-theme-muted"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-theme-secondary uppercase mb-1">
                    Publishing Directives
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Published', 'Draft', 'Archived'].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setStatus(v as 'Published' | 'Draft' | 'Archived')}
                        className={`py-2 px-3 border font-mono text-xs transition-colors rounded-none ${
                          status === v 
                            ? 'bg-[#c3f400] text-black border-black font-extrabold' 
                            : 'border-theme-secondary hover:bg-theme-secondary text-theme-secondary'
                        }`}
                      >
                        {v.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side cover select / file upload */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <label className="block font-mono text-[11px] text-theme-secondary uppercase mb-1">
                  Cover Image URL
                </label>
                <input 
                  type="text" 
                  value={customCoverUrl}
                  onChange={(e) => setCustomCoverUrl(e.target.value)}
                  placeholder="EXECUTIVE URL ARCHIVE (OR CLICK BELOW)"
                  className="w-full bg-theme-input border border-theme-input text-theme font-mono text-xs px-4 py-3 focus:outline-none focus:border-[#c3f400] placeholder:text-theme-muted uppercase rounded-none"
                />
              </div>

              {/* Instant Tiles Cover selection */}
              <div>
                <label className="block font-mono text-[10px] text-theme-muted uppercase mb-2">
                  OR CHOOSE FROM EXISTING COVERS
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {curatedCovers.map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setSelectedCoverUrl(item.url);
                        setCustomCoverUrl('');
                      }}
                      className={`relative aspect-[3/4] cursor-pointer bg-theme-surface-elevated border-2 transition-all ${
                        selectedCoverUrl === item.url && !customCoverUrl
                          ? 'border-[#c3f400]' 
                          : 'border-theme-secondary hover:border-theme-strong'
                      }`}
                    >
                      <img className="w-full h-full object-cover" src={item.url} alt={item.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                        <span className="font-mono text-[9px] text-white uppercase">{item.name}</span>
                      </div>
                      {selectedCoverUrl === item.url && !customCoverUrl && (
                        <span className="absolute top-2 right-2 bg-[#c3f400] text-black p-0.5 rounded-none border border-black">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Drag and Drop Box */}
              <div 
                className={`border-2 border-dashed p-6 text-center transition-colors rounded-none ${
                  dragActive ? 'border-[#c3f400] bg-theme-secondary' : 'border-theme hover:border-theme-strong bg-theme-surface-elevated'
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <UploadCloud className="w-8 h-8 text-theme-tertiary mx-auto mb-2" />
                <span className="block font-mono text-[10px] text-theme uppercase font-bold">
                  {fileName ? `File Selected: ${fileName.toUpperCase()}` : 'Drag & Drop raw images here'}
                </span>
                <span className="block font-mono text-[9px] text-theme-muted uppercase mt-1">
                  or choose from filesystem
                </span>
              </div>

              <div className="pt-6 border-t border-theme-secondary flex justify-between gap-4">
                <button 
                  type="button" 
                  onClick={onCancel}
                  className="w-1/2 border-2 border-theme-strong hover:border-[#c3f400] text-theme py-3 font-mono text-xs uppercase transition-colors font-bold rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c3f400]"
                >
                  Discard Assembly
                </button>
                <button 
                  type="submit"
                  className="w-1/2 bg-[#c3f400] text-black font-mono text-xs uppercase hover:bg-white transition-colors font-extrabold brutalist-shadow rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c3f400]"
                >
                  Compile & Save
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
