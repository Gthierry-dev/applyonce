
import React, { useEffect, useState } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { useCategories } from '@/hooks/useCategories';

interface OpportunityFormDrawerProps {
  trigger?: React.ReactNode;
  onOpportunityAdded?: (opportunity: any) => void;
  onOpportunityUpdated?: (opportunity: any) => void;
  initialData?: any;
  isEditing?: boolean;
}

const OpportunityFormDrawer: React.FC<OpportunityFormDrawerProps> = ({
  trigger,
  onOpportunityAdded,
  onOpportunityUpdated,
  initialData = null,
  isEditing = false,
}) => {
  const { toast } = useToast();
  const categoriesQuery = useCategories();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [opportunitySections, setOpportunitySections] = useState<FormSection[]>([]);

  // Set up form sections with categories from the database
  useEffect(() => {
    if (categoriesQuery.data && categoriesQuery.data.length > 0) {
      const categoryOptions = categoriesQuery.data.map(cat => ({
        label: cat.title,
        value: cat.title
      }));

      setOpportunitySections([
        {
          id: 'basic',
          title: 'Opportunity Information',
          description: 'Create a new opportunity',
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
              placeholder: 'Organization offering this opportunity',
              required: true,
            },
            {
              id: 'description',
              type: 'textarea',
              label: 'Description',
              placeholder: 'Detailed description of the opportunity',
              required: true,
            },
            {
              id: 'category',
              type: 'select',
              label: 'Primary Category',
              required: true,
              options: categoryOptions,
            },
            {
              id: 'categories',
              type: 'multiselect',
              label: 'Additional Categories',
              required: false,
              options: categoryOptions,
            },
            {
              id: 'deadline',
              type: 'date',
              label: 'Application Deadline',
              required: true,
            },
            {
              id: 'website_url',
              type: 'text',
              label: 'Website URL',
              placeholder: 'https://example.com',
              required: false,
            },
            {
              id: 'location',
              type: 'text',
              label: 'Location',
              placeholder: 'Location or Remote',
              required: false,
            },
            {
              id: 'type',
              type: 'select',
              label: 'Type',
              required: false,
              options: [
                { label: 'Full-time', value: 'Full-time' },
                { label: 'Part-time', value: 'Part-time' },
                { label: 'Contract', value: 'Contract' },
                { label: 'Internship', value: 'Internship' },
                { label: 'Scholarship', value: 'Scholarship' },
                { label: 'Grant', value: 'Grant' },
              ],
            },
            {
              id: 'salary',
              type: 'text',
              label: 'Salary/Stipend',
              placeholder: 'e.g. $50,000-$70,000 or $15/hour',
              required: false,
            },
            {
              id: 'is_active',
              type: 'switch',
              label: 'Active',
              description: 'Is this opportunity active and visible to users?',
              required: false,
            },
            {
              id: 'featured',
              type: 'switch',
              label: 'Featured',
              description: 'Show this opportunity at the top of the list',
              required: false,
            },
            {
              id: 'requirements',
              type: 'tagsInput',
              label: 'Requirements',
              placeholder: 'Add requirements',
              required: false,
            }
          ],
        },
      ]);
    }
  }, [categoriesQuery.data]);

  // Set initial form values when editing
  useEffect(() => {
    if (isEditing && initialData) {
      const formattedDeadline = initialData.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '';
      
      setFormValues({
        title: initialData.title || '',
        organization: initialData.organization || '',
        description: initialData.description || '',
        category: initialData.category || '',
        categories: initialData.categories || [],
        deadline: formattedDeadline,
        website_url: initialData.website_url || '',
        location: initialData.location || '',
        type: initialData.type || '',
        salary: initialData.salary || '',
        is_active: initialData.is_active !== undefined ? initialData.is_active : true,
        featured: initialData.featured || false,
        requirements: initialData.requirements || [],
      });
    }
  }, [isEditing, initialData]);

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoading(true);
    
    try {
      // Format deadline to include time
      const deadlineDate = new Date(formData.deadline);
      deadlineDate.setHours(23, 59, 59);
      
      const opportunityData = {
        title: formData.title,
        organization: formData.organization,
        description: formData.description,
        category: formData.category,
        categories: formData.categories || [],
        deadline: deadlineDate.toISOString(),
        website_url: formData.website_url || null,
        location: formData.location || null,
        type: formData.type || null,
        salary: formData.salary || null,
        is_active: formData.is_active !== undefined ? formData.is_active : true,
        featured: formData.featured || false,
        requirements: formData.requirements || [],
        updated_at: new Date().toISOString(),
      };
      
      let result;
      
      if (isEditing && initialData) {
        // Update existing opportunity
        const { data, error } = await supabase
          .from('opportunities')
          .update(opportunityData)
          .eq('id', initialData.id)
          .select('*')
          .single();
        
        if (error) throw error;
        result = data;
        
        toast({
          title: "Opportunity Updated",
          description: "The opportunity has been successfully updated",
        });
        
        if (onOpportunityUpdated) {
          onOpportunityUpdated(result);
        }
      } else {
        // Create new opportunity
        const { data, error } = await supabase
          .from('opportunities')
          .insert(opportunityData)
          .select('*')
          .single();
        
        if (error) throw error;
        result = data;
        
        toast({
          title: "Opportunity Added",
          description: "The opportunity has been successfully created",
        });
        
        if (onOpportunityAdded) {
          onOpportunityAdded(result);
        }
      }
      
      setOpen(false);
    } catch (error: any) {
      console.error('Error saving opportunity:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} opportunity: ${error.message || 'Unknown error'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Opportunity
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isEditing ? 'Edit Opportunity' : 'Create Opportunity'}</SheetTitle>
          <SheetDescription>
            {isEditing ? 'Update opportunity details' : 'Add a new opportunity to the platform'}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-4">
          {categoriesQuery.isLoading ? (
            <div className="flex justify-center py-8">
              <p>Loading categories...</p>
            </div>
          ) : opportunitySections.length > 0 ? (
            <DynamicForm
              title=""
              sections={opportunitySections}
              onSubmit={handleSubmit}
              loading={loading}
              submitButtonText={
                loading ? 
                  "Processing..." : 
                  (isEditing ? 'Update Opportunity' : 'Create Opportunity')
              }
              initialValues={formValues}
            />
          ) : (
            <div className="text-center py-4">
              <p>No categories found. Please create some categories first.</p>
            </div>
          )}
        </div>
        
        <SheetFooter className="pt-2">
          <SheetClose asChild>
            <Button variant="outline" disabled={loading}>Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default OpportunityFormDrawer;
