import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SubscriptionContextProps {
  isSubscribed: boolean;
  subscribe: () => void;
  unsubscribe: () => void;
  canAccessPage: (pageNumber: number) => boolean;
  showPremiumModal: boolean;
  openPremiumModal: () => void;
  closePremiumModal: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextProps | undefined>(undefined);

const FREE_PAGE_LIMIT = 5; // Guests can read first 5 pages

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    return localStorage.getItem('vanguard_premium_subscription') === 'true';
  });

  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Persist subscription state
  useEffect(() => {
    localStorage.setItem('vanguard_premium_subscription', String(isSubscribed));
  }, [isSubscribed]);

  const subscribe = () => {
    setIsSubscribed(true);
    setShowPremiumModal(false);
  };

  const unsubscribe = () => {
    setIsSubscribed(false);
    localStorage.removeItem('vanguard_premium_subscription');
  };

  // Check if user can access a specific page
  const canAccessPage = (pageNumber: number): boolean => {
    if (isSubscribed) return true;
    return pageNumber <= FREE_PAGE_LIMIT;
  };

  const openPremiumModal = () => {
    setShowPremiumModal(true);
  };

  const closePremiumModal = () => {
    setShowPremiumModal(false);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        subscribe,
        unsubscribe,
        canAccessPage,
        showPremiumModal,
        openPremiumModal,
        closePremiumModal,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextProps => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider');
  return ctx;
};
