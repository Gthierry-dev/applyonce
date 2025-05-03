import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { useCategoryFields } from '@/hooks/useCategoryFields';
import { CategoryField } from '@/types/supabase';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

const opportunitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company_name: z.string().min(1, 'Company name is required'),
  description: z.string().optional(),
  category_id: z.string().min(1, 'Category is required'),
  config: z.record(z.any()).optional(),
});

type OpportunityFormData = z.infer<typeof opportunitySchema>;

interface OpportunityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSuccess?: () => void;
}

interface Category {
  id: string;
  title: string;
}

export function OpportunityDrawer({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: OpportunityDrawerProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'details' | 'form'>('details');
  const [opportunityId, setOpportunityId] = useState<string | null>(initialData?.id || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialData?.category_id || '');
  const [enabledFields, setEnabledFields] = useState<Record<string, boolean>>({});

  const { fields, isLoading: isLoadingFields } = useCategoryFields(selectedCategory);

  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: initialData || {
      title: '',
      company_name: '',
      description: '',
      category_id: '',
      config: {},
    },
  });

  // Watch for category_id changes to update selectedCategory
  const watchedCategoryId = watch('category_id');

  useEffect(() => {
    if (watchedCategoryId && watchedCategoryId !== selectedCategory) {
      setSelectedCategory(watchedCategoryId);
    }
  }, [watchedCategoryId]);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      
      // If initialData, set opportunityId and fetch enabled fields
      if (initialData?.id) {
        setOpportunityId(initialData.id);
        fetchEnabledFields(initialData.id);
      }
    }
  }, [isOpen]);

  // Initialize enabled fields from the category fields
  useEffect(() => {
    if (fields.length > 0) {
      const initialEnabledFields: Record<string, boolean> = {};
      fields.forEach(field => {
        initialEnabledFields[field.id] = true;
      });
      
      // Only set default enabled fields if we don't have existing ones
      if (Object.keys(enabledFields).length === 0) {
        setEnabledFields(initialEnabledFields);
      }
    }
  }, [fields]);

  const fetchEnabledFields = async (oppId: string) => {
    try {
      const { data, error } = await supabase
        .from('opportunity_fields')
        .select('field_id, is_enabled')
        .eq('opportunity_id', oppId);
        
      if (error) throw error;
      
      const enabledFieldsMap: Record<string, boolean> = {};
      if (data && data.length > 0) {
        data.forEach(item => {
          enabledFieldsMap[item.field_id] = item.is_enabled;
        });
        setEnabledFields(enabledFieldsMap);
      }
    } catch (error) {
      console.error('Error fetching enabled fields:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const { data, error } = await supabase
        .from('categories')
        .select('id, title')
        .order('title');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch categories',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleDetailsSubmit = async (data: OpportunityFormData) => {
    try {
      setIsSubmitting(true);
      if (initialData) {
        const { error } = await supabase
          .from('opportunities')
          .update({
            title: data.title,
            company_name: data.company_name,
            description: data.description,
            category_id: data.category_id,
          })
          .eq('id', initialData.id);
        
        if (error) throw error;
        setOpportunityId(initialData.id);
        setActiveTab('form');
      } else {
        // Fix: Add the required category field
        const { data: categoryData } = await supabase
          .from('categories')
          .select('title')
          .eq('id', data.category_id)
          .single();
          
        const category = categoryData?.title || 'Unknown';
        
        // Add all required fields for the insert
        const { data: newOpportunity, error } = await supabase
          .from('opportunities')
          .insert([{
            title: data.title,
            company_name: data.company_name,
            description: data.description,
            category_id: data.category_id,
            category: category,
            organization: data.company_name, // Set organization from company_name
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Default deadline: 30 days from now
          }])
          .select()
          .single();
        
        if (error) throw error;
        setOpportunityId(newOpportunity.id);
        setActiveTab('form');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleField = (fieldId: string) => {
    setEnabledFields(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId]
    }));
  };

  const handleComplete = async () => {
    try {
      setIsSubmitting(true);
      
      if (!opportunityId) {
        throw new Error('Opportunity ID is missing');
      }
      
      // Save field configurations
      const fieldUpdates = fields.map(field => ({
        opportunity_id: opportunityId,
        field_id: field.id,
        is_enabled: enabledFields[field.id] ?? true
      }));
      
      // Delete existing field configurations
      const { error: deleteError } = await supabase
        .from('opportunity_fields')
        .delete()
        .eq('opportunity_id', opportunityId);
        
      if (deleteError) throw deleteError;
      
      // Insert new field configurations
      if (fieldUpdates.length > 0) {
        const { error: insertError } = await supabase
          .from('opportunity_fields')
          .insert(fieldUpdates);
          
        if (insertError) throw insertError;
      }
      
      toast({
        title: 'Success',
        description: 'Opportunity saved successfully',
      });
      
      reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[540px] overflow-y-auto">
        <SheetHeader className="space-y-4 pb-4 border-b">
          <SheetTitle>
            {initialData ? 'Edit Opportunity' : 'Create Opportunity'}
          </SheetTitle>
          <SheetDescription>
            {activeTab === 'details' 
              ? 'Enter opportunity details'
              : 'Configure form fields'}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          {activeTab === 'details' ? (
            <form id="opportunity-form" onSubmit={handleSubmit(handleDetailsSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Enter opportunity title"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  {...register('company_name')}
                  placeholder="Enter company name"
                />
                {errors.company_name && (
                  <p className="text-sm text-destructive">{errors.company_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Enter opportunity description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setValue('category_id', value);
                    setSelectedCategory(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category_id && (
                  <p className="text-sm text-destructive">{errors.category_id.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || isLoadingCategories}>
                  {isSubmitting ? 'Saving...' : 'Next: Form Fields'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {isLoadingFields ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : fields.length > 0 ? (
                <>
                  <h3 className="text-lg font-medium">Form Fields</h3>
                  <p className="text-sm text-muted-foreground">
                    Toggle which fields to include in this opportunity's application form.
                  </p>
                  <div className="space-y-4 mt-4">
                    {fields.map((field: CategoryField) => (
                      <div key={field.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <h4 className="font-medium">{field.label}</h4>
                          <p className="text-sm text-muted-foreground">
                            Type: {field.type} {field.required ? '(Required)' : '(Optional)'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{enabledFields[field.id] ? 'Enabled' : 'Disabled'}</span>
                          <Switch
                            checked={enabledFields[field.id] ?? true}
                            onCheckedChange={() => handleToggleField(field.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No form fields have been created for this category.</p>
                </div>
              )}
              
              <div className="flex justify-between space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('details')}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Details
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Complete'}
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
