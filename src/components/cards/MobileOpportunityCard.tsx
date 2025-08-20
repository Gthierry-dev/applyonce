import React from 'react';
import { Heart, X, Clock, MapPin, DollarSign, Building2, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MobileOpportunityCardProps {
  opportunity: any;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onInfo: (opportunity: any) => void;
  isFavorite?: boolean;
}

const MobileOpportunityCard: React.FC<MobileOpportunityCardProps> = ({
  opportunity,
  onLike,
  onDislike,
  onInfo,
  isFavorite = false
}) => {
  // Format the deadline or posted time
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recently posted';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Handle action buttons
  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation(); // Prevent card click
    
    switch(action) {
      case 'like':
        onLike(opportunity.id);
        break;
      case 'dislike':
        onDislike(opportunity.id);
        break;
      case 'info':
        onInfo(opportunity);
        break;
      default:
        break;
    }
  };

  return (
    <div 
      className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-3 touch-manipulation"
      onClick={() => onInfo(opportunity)}
    >
      {/* Card Header */}
      <div className="p-4 pb-2">
        <div className="flex items-start gap-3">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            {opportunity.logo ? (
              <img
                src={opportunity.logo}
                alt={`${opportunity.company || opportunity.organization} logo`}
                className="h-12 w-12 rounded-lg object-contain bg-gray-100"
              />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-700 font-medium">
                {(opportunity.company || opportunity.organization || 'C').charAt(0)}
              </div>
            )}
          </div>
          
          {/* Title and Company */}
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 line-clamp-2">{opportunity.title}</h3>
            <p className="text-sm text-gray-600">{opportunity.company || opportunity.organization}</p>
            
            {/* Match Score */}
            <div className="mt-1">
              <Badge 
                className="bg-green-50 text-green-700 border border-green-200 text-xs font-normal"
              >
                {opportunity.matchScore || 95}% Match
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card Info */}
      <div className="px-4 py-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
        {/* Location */}
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{opportunity.location || 'Remote'}</span>
        </div>
        
        {/* Work Type */}
        <div className="flex items-center gap-1">
          <Building2 className="w-3 h-3" />
          <span>{opportunity.workType || 'Full-time'}</span>
        </div>
        
        {/* Salary/Amount */}
        <div className="flex items-center gap-1">
          <DollarSign className="w-3 h-3" />
          <span>{opportunity.salary || opportunity.amount || 'Competitive'}</span>
        </div>
        
        {/* Posted Time */}
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{opportunity.postedTime || formatDate(opportunity.deadline || '')}</span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="p-3 border-t border-gray-100 flex items-center justify-between">
        {/* Dislike Button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-full p-0 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50"
          onClick={(e) => handleActionClick(e, 'dislike')}
        >
          <X className="h-5 w-5" />
        </Button>
        
        {/* Info Button */}
        <Button
          variant="outline"
          size="sm"
          className="h-10 px-5 text-xs font-medium flex items-center justify-center"
          onClick={(e) => handleActionClick(e, 'info')}
        >
          View Details
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
        
        {/* Like Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`h-10 w-10 rounded-full p-0 flex items-center justify-center ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
          onClick={(e) => handleActionClick(e, 'like')}
        >
          <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
        </Button>
      </div>
    </div>
  );
};

export default MobileOpportunityCard;