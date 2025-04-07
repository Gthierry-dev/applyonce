
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
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
import { OpportunityDrawerHeader } from './OpportunityDrawerHeader';
import { OpportunityDrawerContent } from './OpportunityDrawerContent';
import { OpportunityDrawerFooter } from './OpportunityDrawerFooter';

export interface OpportunityDetails {
  id: string;
  title: string;
  organization: string;
  category: string;
  categories?: string[];
  deadline: string;
  logo?: string;
  description: string;
  requirements?: string[];
  location?: string;
  type?: string;
  salary?: string;
  website_url?: string;
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
      <OpportunityDrawerHeader opportunity={opportunity} />
      <OpportunityDrawerContent 
        opportunity={opportunity} 
        formatDeadline={formatDeadline} 
      />
      <OpportunityDrawerFooter 
        opportunity={opportunity}
        handleApply={handleApply}
      />
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
