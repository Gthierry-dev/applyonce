import React, { useState, useRef } from 'react';
import { Heart, X, Info, Clock, MapPin, Building2, DollarSign, Briefcase, Award, GraduationCap, MoreHorizontal, Share, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, PanInfo, useAnimation } from 'framer-motion';

interface SwipeableOpportunityCardProps {
  opportunity: any;
  onSwipeLeft: (id: string) => void;
  onSwipeRight: (id: string) => void;
  onSwipeUp: (id: string) => void;
  onInfoClick: (opportunity: any) => void;
}

const SwipeableOpportunityCard: React.FC<SwipeableOpportunityCardProps> = ({
  opportunity,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onInfoClick
}) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase className="w-4 h-4" />;
      case 'scholarship':
        return <Award className="w-4 h-4" />;
      case 'internship':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragOffset({ x: info.offset.x, y: info.offset.y });
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    
    // Simplified threshold for more reliable detection
    const swipeThreshold = 80;
    const upSwipeThreshold = -80;
    
    // Detect tap first (very small movement)
    if (Math.abs(info.offset.x) < 10 && Math.abs(info.offset.y) < 10) {
      onInfoClick(opportunity);
      return;
    }
    
    // Determine primary direction of swipe (horizontal or vertical)
    const isHorizontalSwipe = Math.abs(info.offset.x) > Math.abs(info.offset.y);
    
    if (isHorizontalSwipe) {
      if (info.offset.x > swipeThreshold) {
        // Swipe right - like/apply
        controls.start({ 
          x: 400, 
          opacity: 0,
          transition: { duration: 0.3, ease: "easeOut" }
        }).then(() => {
          onSwipeRight(opportunity.id);
        });
      } else if (info.offset.x < -swipeThreshold) {
        // Swipe left - reject
        controls.start({ 
          x: -400, 
          opacity: 0,
          transition: { duration: 0.3, ease: "easeOut" }
        }).then(() => {
          onSwipeLeft(opportunity.id);
        });
      } else {
        // Reset position if not swiped far enough
        controls.start({ x: 0, y: 0, opacity: 1, transition: { type: "spring", damping: 20 } });
      }
    } else {
      if (info.offset.y < upSwipeThreshold) {
        // Swipe up - next opportunity
        controls.start({ 
          y: -800, 
          opacity: 0,
          transition: { duration: 0.3, ease: "easeOut" }
        }).then(() => {
          onSwipeUp(opportunity.id);
        });
      } else {
        // Reset position if not swiped far enough
        controls.start({ x: 0, y: 0, opacity: 1, transition: { type: "spring", damping: 20 } });
      }
    }
  };

  // Calculate tilt based on drag - much more subtle
  const tiltX = isDragging ? (dragOffset.x / 20) : 0;
  const tiltY = isDragging ? (-dragOffset.y / 30) : 0;
  
  // Calculate overlay opacity for visual feedback
  const leftOverlayOpacity = Math.max(0, Math.min(0.7, -dragOffset.x / 150));
  const rightOverlayOpacity = Math.max(0, Math.min(0.7, dragOffset.x / 150));
  const upOverlayOpacity = Math.max(0, Math.min(0.7, -dragOffset.y / 150));

  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <motion.div
        ref={cardRef}
        className="w-full max-w-sm h-[600px] rounded-3xl overflow-hidden shadow-2xl relative bg-white cursor-grab active:cursor-grabbing"
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.15}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onClick={() => onInfoClick(opportunity)}
        animate={controls}
        style={{ 
          rotateX: tiltY,
          rotateZ: tiltX,
          transformPerspective: 1000
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
      >
        {/* Header with menu */}
        <div className="absolute top-0 left-0 right-0 z-30 p-4">
          <div className="flex justify-end">
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <MoreHorizontal className="w-5 h-5 text-white" />
              </button>
              
              {showMenu && (
                <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg py-2 min-w-[140px] z-40">
                  <div className="flex items-center px-3 py-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    already applied
                  </div>
                  <button className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full">
                    <Share className="w-4 h-4 mr-2" />
                    share
                  </button>
                  <button className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full">
                    <Flag className="w-4 h-4 mr-2" />
                    Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Green header section */}
        <div className="h-32 bg-gradient-to-br from-green-600 to-green-700 relative">
          {/* Company logo */}
          <div className="absolute bottom-4 left-4">
            <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">R</span>
            </div>
          </div>
        </div>

        {/* Swipe Feedback Overlays */}
        {/* Left Swipe - Reject */}
        <motion.div 
          className="absolute inset-0 bg-red-500/80 flex items-center justify-center rounded-3xl"
          style={{ opacity: leftOverlayOpacity }}
        >
          <div className="bg-white rounded-full p-6">
            <X className="w-16 h-16 text-red-500" />
          </div>
        </motion.div>
        
        {/* Right Swipe - Like */}
        <motion.div 
          className="absolute inset-0 bg-green-500/80 flex items-center justify-center rounded-3xl"
          style={{ opacity: rightOverlayOpacity }}
        >
          <div className="bg-white rounded-full p-6">
            <Heart className="w-16 h-16 text-green-500" />
          </div>
        </motion.div>
        
        {/* Up Swipe - Next */}
        <motion.div 
          className="absolute inset-0 bg-blue-500/80 flex items-center justify-center rounded-3xl"
          style={{ opacity: upOverlayOpacity }}
        >
          <div className="bg-white rounded-full p-6">
            <span className="text-blue-500 text-xl font-bold">NEXT</span>
          </div>
        </motion.div>

        {/* Main content area */}
        <div className="px-6 py-4 space-y-4">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {opportunity.title || "Frontend Engineer Intern"}
          </h1>

          {/* Company info */}
          <div className="space-y-1">
            <p className="text-gray-600">
              {opportunity.company || "CrowdStrike"} • {opportunity.type || "Artificial Intelligence (AI)"} • {opportunity.category || "Cloud Data Services"}
            </p>
            <p className="text-gray-600">{opportunity.companyType || "Public Company"}</p>
          </div>

          {/* Time posted */}
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{opportunity.postedTime || "54 minutes ago"}</span>
            <span className="ml-auto bg-gray-100 px-2 py-1 rounded text-xs">
              {opportunity.workType || "Internship"}
            </span>
          </div>

          {/* Match section */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-2">Strong match</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">remote</p>
                <p className="text-sm text-gray-600">Entry, Mid Level</p>
                <p className="text-sm text-gray-600">Part time</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm text-gray-600">2+ years exp</p>
                <p className="text-sm text-gray-600">${opportunity.salary || "$84k/yr - $90k/yr"}</p>
              </div>
              <div className="ml-4">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray="90, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-green-600">90%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => onInfoClick(opportunity)}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium flex items-center justify-center"
            >
              <Info className="w-4 h-4 mr-2" />
              More
            </button>
            <button 
              onClick={() => onSwipeRight(opportunity.id)}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium flex items-center justify-center"
            >
              <Heart className="w-4 h-4 mr-2" />
              Like
            </button>
            <button 
              onClick={() => onSwipeUp(opportunity.id)}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center"
            >
              Ask Otto
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SwipeableOpportunityCard;