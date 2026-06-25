import React from 'react';
import { X, Crown, BookOpen, Calendar, Star, Sparkles } from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';

export default function PremiumModal() {
  const { showPremiumModal, closePremiumModal, subscribe } = useSubscription();

  if (!showPremiumModal) return null;

  const handleSubscribe = () => {
    subscribe();
  };

  const handleMaybeLater = () => {
    closePremiumModal();
  };

  return (
    <div
      id="premium-membership-modal"
      className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleMaybeLater();
        }
      }}
    >
      <div
        className="bg-[#131313] border-4 border-[#c3f400] max-w-xl w-full relative shadow-[12px_12px_0px_#000000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleMaybeLater}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-1 z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="bg-[#c3f400] text-black p-6 border-b-4 border-black">
          <div className="flex items-center justify-center mb-3">
            <div className="w-16 h-16 bg-black border-2 border-black flex items-center justify-center">
              <Crown className="w-9 h-9 text-[#c3f400]" />
            </div>
          </div>
          <h2 className="font-serif font-black text-4xl md:text-5xl uppercase text-center tracking-tighter italic leading-none">
            Premium Membership
          </h2>
          <p className="font-mono text-xs text-center mt-2 uppercase tracking-wider font-bold">
            Unlock Full Vanguard Experience
          </p>
        </div>

        {/* Benefits Section */}
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-zinc-950/60 border border-zinc-800">
              <div className="flex-shrink-0 w-10 h-10 bg-[#c3f400]/20 border border-[#c3f400] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#c3f400]" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-white uppercase">
                  Unlimited Magazines
                </h3>
                <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">
                  Access our entire catalog of premium editorial content without restrictions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-zinc-950/60 border border-zinc-800">
              <div className="flex-shrink-0 w-10 h-10 bg-[#c3f400]/20 border border-[#c3f400] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#c3f400]" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-white uppercase">
                  Full PDF Access
                </h3>
                <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">
                  Read complete issues from cover to cover with no page limits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-zinc-950/60 border border-zinc-800">
              <div className="flex-shrink-0 w-10 h-10 bg-[#c3f400]/20 border border-[#c3f400] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#c3f400]" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-white uppercase">
                  Monthly Editions
                </h3>
                <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">
                  Get instant access to new releases as soon as they're published.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-zinc-950/60 border border-zinc-800">
              <div className="flex-shrink-0 w-10 h-10 bg-[#c3f400]/20 border border-[#c3f400] flex items-center justify-center">
                <Star className="w-5 h-5 text-[#c3f400]" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-white uppercase">
                  Exclusive Issues
                </h3>
                <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">
                  Members-only content and behind-the-scenes editorial features.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleSubscribe}
              className="w-full bg-[#c3f400] text-black font-mono text-sm font-black uppercase py-4 hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <Crown className="w-5 h-5" />
              Subscribe Now
            </button>

            <button
              onClick={handleMaybeLater}
              className="w-full border-2 border-zinc-800 text-zinc-400 font-mono text-sm font-bold uppercase py-4 hover:border-white hover:text-white transition-colors"
            >
              Maybe Later
            </button>
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-zinc-900">
            <p className="font-mono text-[10px] text-center text-zinc-500 uppercase tracking-wider leading-relaxed">
              Demo Mode • Subscription Instantly Activated • No Payment Required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
