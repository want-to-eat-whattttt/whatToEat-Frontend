import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RecommendationContextProps {
  recommendation: string | null;
  setRecommendation: (recommendation: string | null) => void;
}

const RecommendationContext = createContext<RecommendationContextProps | undefined>(undefined);

export const RecommendationProvider = ({ children }: { children: ReactNode }) => {
  const [recommendation, setRecommendation] = useState<string | null>(null);

  return (
    <RecommendationContext.Provider value={{ recommendation, setRecommendation }}>
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendation = () => {
  const context = useContext(RecommendationContext);
  if (context === undefined) {
    throw new Error('useRecommendation must be used within a RecommendationProvider');
  }
  return context;
};
