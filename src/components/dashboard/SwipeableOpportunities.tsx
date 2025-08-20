import React, { useState, useEffect } from 'react';
import SwipeableOpportunityCard from '../cards/SwipeableOpportunityCard';
import OpportunityDetailPanel from './OpportunityDetailPanel';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SwipeableOpportunitiesProps {
  opportunities: any[];
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  likedOpportunities: Set<string>;
}

const SwipeableOpportunities: React.FC<SwipeableOpportunitiesProps> = ({
  opportunities,
  onLike,
  onDislike,
  likedOpportunities
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  
  // Reset index when opportunities change
  useEffect(() => {
    setCurrentIndex(0);
  }, [opportunities]);
  
  const handleSwipeLeft = (id: string) => {
    onDislike(id);
    setCurrentIndex(prev => Math.min(prev + 1, opportunities.length - 1));
  };
  
  const handleSwipeRight = (id: string) => {
    onLike(id);
    setCurrentIndex(prev => Math.min(prev + 1, opportunities.length - 1));
  };
  
  const handleInfoClick = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setShowDetails(true);
  };
  
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedOpportunity(null);
  };
  
  // No opportunities or all swiped
  if (opportunities.length === 0 || currentIndex >= opportunities.length) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4">
        <p className="text-xl font-medium text-gray-700 mb-4">No more opportunities</p>
        <p className="text-gray-500 mb-6">Check back later for more opportunities</p>
        <Button onClick={() => setCurrentIndex(0)} variant="outline">
          Start Over
        </Button>
      </div>
    );
  }
  
  return (
    <div className="h-full relative">
      {showDetails ? (
        <div className="h-full">
          <div className="absolute top-4 right-4 z-50">
            <Button variant="ghost" size="icon" onClick={handleCloseDetails}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <OpportunityDetailPanel 
            opportunity={selectedOpportunity} 
            onClose={handleCloseDetails} 
          />
        </div>
      ) : (
        <SwipeableOpportunityCard
          opportunity={opportunities[currentIndex]}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onInfoClick={handleInfoClick}
        />
      )}
    </div>
  );
};

export default SwipeableOpportunities;