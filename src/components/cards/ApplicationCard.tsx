
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import OpportunityDrawer from './OpportunityDrawer';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'draft';

export interface ApplicationCardProps {
  id: string;
  title: string;
  organization: string;
  category: string;
  submittedDate: string;
  status: ApplicationStatus;
  logo?: string;
  className?: string;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  id,
  title,
  organization,
  category,
  submittedDate,
  status,
  logo,
  className,
}) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Status badge configuration
  const statusConfig = {
    pending: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: <AlertCircle className="mr-1 h-3.5 w-3.5" />,
      text: 'Pending',
    },
    approved: {
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircle className="mr-1 h-3.5 w-3.5" />,
      text: 'Approved',
    },
    rejected: {
      color: 'bg-red-100 text-red-800',
      icon: <XCircle className="mr-1 h-3.5 w-3.5" />,
      text: 'Rejected',
    },
    draft: {
      color: 'bg-blue-100 text-blue-800',
      icon: <Clock className="mr-1 h-3.5 w-3.5" />,
      text: 'Draft',
    },
  };

  const currentStatus = statusConfig[status];

  // Mock opportunity details for the drawer
  const opportunityDetails = {
    id,
    title,
    organization,
    category,
    deadline: submittedDate, // Using submittedDate as a placeholder for deadline
    description: "This is a placeholder description for the opportunity. The actual details would come from the API.",
    requirements: ["Requirement 1", "Requirement 2", "Requirement 3"],
    location: "Remote",
    type: "Full-time",
    salary: "$50,000 - $70,000",
    logo,
    website_url: "#",
  };

  return (
    <OpportunityDrawer
      opportunity={opportunityDetails}
      trigger={
        <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer", className)}>
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
            <div className="flex justify-between items-center">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>Submitted: {formatDate(submittedDate)}</span>
              </div>
              <Badge 
                variant="outline" 
                className={cn("flex items-center px-2 py-0.5", currentStatus.color)}
              >
                {currentStatus.icon}
                {currentStatus.text}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs">
              <Link to={`/applications/${id}`}>View Details</Link>
            </Button>
            {status === 'draft' ? (
              <Button asChild variant="default" size="sm" className="h-8 px-3 text-xs">
                <Link to={`/applications/${id}/edit`}>
                  Continue
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="h-8 px-3 text-xs" asChild>
                <a href={opportunityDetails.website_url} target="_blank" rel="noopener noreferrer">
                  Website
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      }
    />
  );
};

export default ApplicationCard;
