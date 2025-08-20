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
  
  // Only reset index when opportunities array length changes
  useEffect(() => {
    // Only reset if the array length changes, not on every reference change
    setCurrentIndex(prevIndex => {
      // If current index is valid, keep it, otherwise reset to 0
      return prevIndex < opportunities.length ? prevIndex : 0;
    });
  }, [opportunities.length]);
  
  const handleSwipeLeft = (id: string) => {
    onDislike(id);
    // Safely increment index
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;
      return nextIndex < opportunities.length ? nextIndex : prev;
    });
  };
  
  const handleSwipeRight = (id: string) => {
    onLike(id);
    // Safely increment index
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;
      return nextIndex < opportunities.length ? nextIndex : prev;
    });
  };
  
  const handleSwipeUp = (id: string) => {
    // Move to next opportunity without liking or disliking
    // Safely increment index
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;
      return nextIndex < opportunities.length ? nextIndex : prev;
    });
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
          {/* Removed duplicate close button here */}
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
          onSwipeUp={handleSwipeUp}
          onInfoClick={handleInfoClick}
        />
      )}
    </div>
  );
};

export default SwipeableOpportunities;