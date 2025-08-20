import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface AddOpportunityDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: any) => void;
}

const AddOpportunityDrawer: React.FC<AddOpportunityDrawerProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
}) => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = React.useState({
    title: '',
    url: '',
    company_name: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Choose the appropriate component based on device type
  const DrawerComponent = isMobile ? Drawer : Sheet;
  const DrawerContentComponent = isMobile ? DrawerContent : SheetContent;
  const DrawerHeaderComponent = isMobile ? DrawerHeader : SheetHeader;
  const DrawerTitleComponent = isMobile ? DrawerTitle : SheetTitle;
  const DrawerFooterComponent = isMobile ? DrawerFooter : SheetFooter;
  const DrawerCloseComponent = isMobile ? DrawerClose : SheetClose;

  return (
    <DrawerComponent open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContentComponent className="p-0">
        <DrawerHeaderComponent className="border-b p-4 flex items-center justify-between">
          <DrawerTitleComponent className="text-lg font-semibold">Add a New Job</DrawerTitleComponent>
          <DrawerCloseComponent asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DrawerCloseComponent>
        </DrawerHeaderComponent>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-red-500 flex items-center">
              <span className="text-red-500 mr-1">*</span> Job Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter Job Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium flex items-center">
              <span className="text-red-500 mr-1">*</span> URL for Original Posting
            </Label>
            <Input
              id="url"
              name="url"
              placeholder="Enter URL"
              value={formData.url}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company_name" className="text-sm font-medium flex items-center">
              <span className="text-red-500 mr-1">*</span> Company Name
            </Label>
            <Input
              id="company_name"
              name="company_name"
              placeholder="Please enter the job title"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium flex items-center">
              <span className="text-red-500 mr-1">*</span> Job Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Please paste the complete job description..."
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full min-h-[200px]"
            />
          </div>
          
          <DrawerFooterComponent className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-[#00E676] hover:bg-[#00C853] text-black font-medium"
            >
              Save Job
            </Button>
          </DrawerFooterComponent>
        </form>
      </DrawerContentComponent>
    </DrawerComponent>
  );
};

export default AddOpportunityDrawer;