
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface OpportunityCardProps {
  id: string;
  title: string;
  organization: string;
  category: string;
  deadline: string;
  logo?: string;
  description: string;
  className?: string;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  id,
  title,
  organization,
  category,
  deadline,
  logo,
  description,
  className,
}) => {
  // Format the deadline
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

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
          <Badge variant="outline" className="text-xs">
            <Tag className="mr-1 h-3 w-3" />
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-foreground/80 line-clamp-2">{description}</p>
        <div className="mt-3 flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          <span>Deadline: {formatDeadline(deadline)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs">
          <Link to={`/explore/${id}`}>View Details</Link>
        </Button>
        <Button asChild variant="default" size="sm" className="h-8 px-3 text-xs">
          <Link to={`/apply/${id}`}>
            Apply Now
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
