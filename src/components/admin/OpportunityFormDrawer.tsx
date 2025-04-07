
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
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
import DynamicForm, { FormSection } from '@/components/forms/DynamicForm';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Form configuration for opportunity creation
const opportunitySections: FormSection[] = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Enter the basic details of the opportunity',
    fields: [
      {
        id: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter opportunity title',
        required: true,
      },
      {
        id: 'organization',
        type: 'text',
        label: 'Organization',
        placeholder: 'Enter organization name',
        required: true,
      },
      {
        id: 'category',
        type: 'select',
        label: 'Category',
        required: true,
        options: [
          { label: 'Scholarship', value: 'scholarship' },
          { label: 'Fellowship', value: 'fellowship' },
          { label: 'Internship', value: 'internship' },
          { label: 'Grant', value: 'grant' },
          { label: 'Award', value: 'award' },
        ],
      },
      {
        id: 'type',
        type: 'text',
        label: 'Type',
        placeholder: 'E.g., Summer, Full-time, Remote',
      },
      {
        id: 'deadline',
        type: 'date',
        label: 'Deadline',
        required: true,
      },
      {
        id: 'website_url',
        type: 'text',
        label: 'Website URL',
        placeholder: 'Enter the official website URL for this opportunity',
      },
    ],
  },
  {
    id: 'details',
    title: 'Opportunity Details',
    description: 'Provide more detailed information about the opportunity',
    fields: [
      {
        id: 'description',
        type: 'textarea',
        label: 'Description',
        placeholder: 'Enter a detailed description of the opportunity',
        required: true,
      },
      {
        id: 'location',
        type: 'text',
        label: 'Location',
        placeholder: 'E.g., Remote, New York, NY',
      },
      {
        id: 'salary',
        type: 'text',
        label: 'Compensation',
        placeholder: 'E.g., $50,000/year, $20/hour, Fully funded',
      },
    ],
  },
  {
    id: 'requirements',
    title: 'Requirements & Eligibility',
    description: 'Specify who can apply for this opportunity',
    fields: [
      {
        id: 'requirements',
        type: 'textarea',
        label: 'Requirements',
        placeholder: 'Enter requirements, each on a new line',
      },
      {
        id: 'isActive',
        type: 'switch',
        label: 'Active Status',
        placeholder: 'Make this opportunity visible to users',
      },
      {
        id: 'featured',
        type: 'switch',
        label: 'Featured',
        placeholder: 'Show this opportunity as featured',
      },
    ],
  },
];

interface OpportunityFormDrawerProps {
  trigger?: React.ReactNode;
}

const OpportunityFormDrawer: React.FC<OpportunityFormDrawerProps> = ({ 
  trigger
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    
    try {
      // Process form data
      console.log('Submitted opportunity:', formData);

      // Convert requirements text to array
      if (formData.requirements) {
        formData.requirements = formData.requirements
          .split('\n')
          .map((item: string) => item.trim())
          .filter((item: string) => item);
      }

      // Prepare data for Supabase
      const opportunityData = {
        title: formData.title,
        organization: formData.organization,
        category: formData.category,
        type: formData.type,
        deadline: new Date(formData.deadline).toISOString(),
        description: formData.description,
        location: formData.location,
        salary: formData.salary,
        requirements: formData.requirements,
        website_url: formData.website_url,
        is_active: formData.isActive,
        featured: formData.featured
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from('opportunities')
        .insert(opportunityData);

      if (error) {
        throw error;
      }

      toast({
        title: "Opportunity Added",
        description: "The opportunity has been successfully created",
      });
    } catch (error) {
      console.error('Error adding opportunity:', error);
      toast({
        title: "Error",
        description: "Failed to add opportunity. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Opportunity
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Opportunity</SheetTitle>
          <SheetDescription>
            Fill in the details to create a new opportunity
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <DynamicForm
            title="New Opportunity"
            sections={opportunitySections}
            onSubmit={handleSubmit}
            loading={loading}
            submitButtonText="Add Opportunity"
          />
        </div>
        
        <SheetFooter className="pt-2">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default OpportunityFormDrawer;
