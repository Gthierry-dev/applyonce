
import React, { useState, useEffect } from 'react';
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
import { Plus, Loader2 } from 'lucide-react';
import { supabase, Category } from '@/integrations/supabase/client';
import { useCategories } from '@/hooks/useCategories';

interface OpportunityFormDrawerProps {
  trigger?: React.ReactNode;
}

const OpportunityFormDrawer: React.FC<OpportunityFormDrawerProps> = ({ 
  trigger
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [formSections, setFormSections] = useState<FormSection[]>([]);
  
  useEffect(() => {
    if (categories) {
      const categoriesOptions = categories.map(category => ({
        label: category.title,
        value: category.title
      }));
      
      // Update the form sections with the categories
      setFormSections([
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
              id: 'categories',
              type: 'multiselect',
              label: 'Categories',
              required: true,
              options: categoriesOptions,
              description: 'Select all relevant categories for this opportunity',
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
              required: true,
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
      ]);
    }
  }, [categories]);

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

      // Get primary category (first one)
      const primaryCategory = formData.categories && formData.categories.length > 0 
        ? formData.categories[0] 
        : "";

      // Store all selected categories in an array
      const categoriesArray = Array.isArray(formData.categories) 
        ? formData.categories 
        : [formData.categories].filter(Boolean);

      // Prepare data for Supabase
      const opportunityData = {
        title: formData.title,
        organization: formData.organization,
        category: primaryCategory, // Keep primary category in the original field
        categories: categoriesArray, // Store all categories in a new field
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
      const { error } = await supabase
        .from('opportunities')
        .insert(opportunityData);

      if (error) {
        throw error;
      }

      toast({
        title: "Opportunity Added",
        description: "The opportunity has been successfully created",
      });
    } catch (error: any) {
      console.error('Error adding opportunity:', error);
      toast({
        title: "Error",
        description: `Failed to add opportunity: ${error.message || "Unknown error"}`,
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
          {categoriesLoading ? (
            <div className="flex justify-center py-8">
              <p>Loading form...</p>
            </div>
          ) : (
            <DynamicForm
              title="New Opportunity"
              sections={formSections}
              onSubmit={handleSubmit}
              loading={loading}
              submitButtonText={loading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Opportunity...
                </span>
              ) : (
                "Add Opportunity"
              )}
            />
          )}
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
