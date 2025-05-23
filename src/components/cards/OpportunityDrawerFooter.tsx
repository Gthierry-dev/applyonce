
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OpportunityDetails } from './OpportunityDrawer';

interface OpportunityDrawerFooterProps {
  opportunity: OpportunityDetails;
  handleApply: () => void;
}

export const OpportunityDrawerFooter: React.FC<OpportunityDrawerFooterProps> = ({ 
  opportunity,
  handleApply
}) => {
  return (
    <div className="flex justify-end gap-2 mt-6">
      <Button variant="outline" className="gap-2" asChild>
        <a href={`https://example.com/jobs/${opportunity.id}`} target="_blank" rel="noopener noreferrer">
          View Full Details
          <Send className="h-4 w-4" />
        </a>
      </Button>
      <Button onClick={handleApply} className="gap-2">
        Apply Now
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};
