
import React from 'react';
import { Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { OpportunityDetails } from './OpportunityDrawer';

interface OpportunityDrawerHeaderProps {
  opportunity: OpportunityDetails;
}

export const OpportunityDrawerHeader: React.FC<OpportunityDrawerHeaderProps> = ({ 
  opportunity 
}) => {
  return (
    <div className="space-y-6 p-1">
      <div className="flex items-start gap-4">
        {opportunity.logo ? (
          <img
            src={opportunity.logo}
            alt={`${opportunity.organization} logo`}
            className="h-16 w-16 rounded-md object-contain bg-accent/50 p-1"
          />
        ) : (
          <div className="h-16 w-16 rounded-md bg-primary/10 flex items-center justify-center text-primary font-medium text-xl">
            {opportunity.organization.charAt(0)}
          </div>
        )}
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">{opportunity.title}</h3>
          <p className="text-muted-foreground">{opportunity.organization}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="outline" className="text-xs">
              <Tag className="mr-1 h-3 w-3" />
              {opportunity.category}
            </Badge>
            {opportunity.type && (
              <Badge variant="secondary" className="text-xs">
                {opportunity.type}
              </Badge>
            )}
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};
