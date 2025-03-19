
import React from 'react';
import { ExternalLink, Clock, Tag, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export interface OpportunityDetails {
  id: string;
  title: string;
  organization: string;
  category: string;
  deadline: string;
  logo?: string;
  description: string;
  requirements?: string[];
  location?: string;
  type?: string;
  salary?: string;
}

interface OpportunityDrawerProps {
  opportunity: OpportunityDetails;
  trigger?: React.ReactNode;
}

const OpportunityDrawer: React.FC<OpportunityDrawerProps> = ({ 
  opportunity,
  trigger
}) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  const handleApply = () => {
    toast({
      title: "Application Submitted",
      description: `You've applied to ${opportunity.title}`,
    });
  };

  const drawerContent = (
    <>
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
      
      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" className="gap-2" asChild>
          <a href={`https://example.com/jobs/${opportunity.id}`} target="_blank" rel="noopener noreferrer">
            View Full Details
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button onClick={handleApply}>Apply Now</Button>
      </div>
    </>
  );

  // Use Sheet for desktop and Drawer for mobile
  return isMobile ? (
    <Drawer>
      <DrawerTrigger asChild>
        {trigger || <Button>View Details</Button>}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Opportunity Details</DrawerTitle>
          <DrawerDescription>
            View and apply for this opportunity
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 md:px-6">
          {drawerContent}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || <Button>View Details</Button>}
      </SheetTrigger>
      <SheetContent className="w-[450px] sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Opportunity Details</SheetTitle>
          <SheetDescription>
            View and apply for this opportunity
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {drawerContent}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default OpportunityDrawer;
