
import React, { useState } from 'react';
import { Clock, Tag, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import OpportunityDrawer, { OpportunityDetails } from './OpportunityDrawer';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface OpportunityCardProps extends OpportunityDetails {
  className?: string;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  id,
  title,
  organization,
  category,
  categories,
  deadline,
  logo,
  description,
  website_url,
  className,
  ...rest
}) => {
  const { toast } = useToast();
  const [applying, setApplying] = useState(false);

  // Format the deadline
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Handle application
  const handleApply = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setApplying(true);
    
    try {
      // In a real implementation, this would call the Supabase API to create an application
      // For now, just showing a success toast
      
      setTimeout(() => {
        toast({
          title: "Application Submitted",
          description: `You've applied to ${title}`,
        });
        setApplying(false);
      }, 800);
    } catch (error) {
      console.error('Error applying to opportunity:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit application. Please try again.",
      });
      setApplying(false);
    }
  };

  // Combined opportunity object to pass to drawer
  const opportunity: OpportunityDetails = {
    id,
    title,
    organization,
    category,
    categories,
    deadline,
    logo,
    description,
    website_url,
    ...rest
  };

  // Handle multiple categories or fallback to single category
  const displayCategories = categories && categories.length > 0 
    ? categories 
    : category 
      ? [category] 
      : [];

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md", className)}>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {logo ? (
              <img
                src={logo}
                alt={`${organization} logo`}
                className="h-10 w-10 rounded-md object-contain bg-accent p-1"
              />
            ) : (
              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary font-medium">
                {organization.charAt(0)}
              </div>
            )}
            <div>
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{organization}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* Categories */}
        {displayCategories && displayCategories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {displayCategories.map((cat, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Tag className="mr-1 h-3 w-3" />
                {cat}
              </Badge>
            ))}
          </div>
        )}
        
        <p className="text-sm text-foreground/80 line-clamp-2">{description}</p>
        <div className="mt-3 flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          <span>Deadline: {formatDeadline(deadline)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            Save
          </Button>
          
          {website_url && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              asChild
            >
              <a 
                href={website_url} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Website
              </a>
            </Button>
          )}
        </div>
        
        <OpportunityDrawer 
          opportunity={opportunity}
          trigger={
            <Button 
              variant="default" 
              size="sm" 
              className="h-8 px-3 text-xs"
              onClick={handleApply}
              disabled={applying}
            >
              {applying ? "Applying..." : "Apply Now"}
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
