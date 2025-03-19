
import React from 'react';
import { Clock, Info } from 'lucide-react';
import { OpportunityDetails } from './OpportunityDrawer';

interface OpportunityDrawerContentProps {
  opportunity: OpportunityDetails;
  formatDeadline: (dateString: string) => string;
}

export const OpportunityDrawerContent: React.FC<OpportunityDrawerContentProps> = ({ 
  opportunity,
  formatDeadline
}) => {
  return (
    <div className="space-y-6 p-1">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium">Description</h4>
          <p className="text-sm text-muted-foreground mt-1">{opportunity.description}</p>
        </div>
        
        {opportunity.requirements && (
          <div>
            <h4 className="text-sm font-medium">Requirements</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
              {opportunity.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {opportunity.location && (
            <div className="flex items-center text-muted-foreground">
              <Info className="mr-2 h-4 w-4" />
              <span>Location: {opportunity.location}</span>
            </div>
          )}
          
          {opportunity.salary && (
            <div className="flex items-center text-muted-foreground">
              <Info className="mr-2 h-4 w-4" />
              <span>Salary: {opportunity.salary}</span>
            </div>
          )}
          
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>Deadline: {formatDeadline(opportunity.deadline)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
