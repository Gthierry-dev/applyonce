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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCategories } from '@/hooks/useCategories';

const opportunitySchema = z.object({
  title: z.string().min(1, 'Position name is required'),
  company_name: z.string().min(1, 'Company name is required'),
  description: z.string().min(1, 'Description is required'),
  category_id: z.string().min(1, 'Category is required'),
});

type OpportunityFormData = z.infer<typeof opportunitySchema>;

interface OpportunityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSuccess?: () => void;
}

interface CategoryField {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export function OpportunityDrawer({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: OpportunityDrawerProps) {
  const { toast } = useToast();
  const { data: categories } = useCategories();
  const [activeTab, setActiveTab] = useState('general');
  const [categoryFields, setCategoryFields] = useState<CategoryField[]>([]);
  const [configData, setConfigData] = useState<Record<string, any>>({});

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: initialData || {
      title: '',
      company_name: '',
      description: '',
      category_id: '',
    },
  });

  const selectedCategoryId = watch('category_id');

  // Fetch category fields when category changes
  useEffect(() => {
    if (selectedCategoryId) {
      fetchCategoryFields(selectedCategoryId);
    } else {
      setCategoryFields([]);
      setConfigData({});
    }
  }, [selectedCategoryId]);

  const fetchCategoryFields = async (categoryId: string) => {
    try {
      const { data, error } = await supabase
        .from('category_fields')
        .select('*')
        .eq('category_id', categoryId)
        .order('order');

      if (error) throw error;

      setCategoryFields(data || []);
      
      // Initialize config data with existing values or empty strings
      if (initialData?.config) {
        setConfigData(initialData.config);
      } else {
        const newConfigData = (data || []).reduce((acc, field) => ({
          ...acc,
          [field.name]: '',
        }), {});
        setConfigData(newConfigData);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch category fields',
        variant: 'destructive',
      });
    }
  };

  const handleConfigChange = (fieldName: string, value: string) => {
    setConfigData(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const onSubmit = async (data: OpportunityFormData) => {
    try {
      const opportunityData = {
        ...data,
        config: configData,
      };

      if (initialData) {
        const { error } = await supabase
          .from('opportunities')
          .update(opportunityData)
          .eq('id', initialData.id);
        
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Opportunity updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('opportunities')
          .insert([opportunityData]);
        
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Opportunity created successfully',
        });
      }
      
      reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const renderField = (field: CategoryField) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={configData[field.name] || ''}
            onChange={(e) => handleConfigChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case 'select':
        return (
          <Select
            value={configData[field.name] || ''}
            onValueChange={(value) => handleConfigChange(field.name, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'checkbox':
        return (
          <Input
            type="checkbox"
            checked={configData[field.name] || false}
            onChange={(e) => handleConfigChange(field.name, e.target.checked.toString())}
            className="w-4 h-4"
          />
        );
      case 'date':
        return (
          <Input
            type="date"
            value={configData[field.name] || ''}
            onChange={(e) => handleConfigChange(field.name, e.target.value)}
            required={field.required}
          />
        );
      default:
        return (
          <Input
            type={field.type}
            value={configData[field.name] || ''}
            onChange={(e) => handleConfigChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
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
            {initialData 
              ? 'Update opportunity details and configuration'
              : 'Create a new opportunity with details and category-specific configuration'}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">General Details</TabsTrigger>
              <TabsTrigger value="config" disabled={!selectedCategoryId}>
                Configuration
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <Select
                  value={selectedCategoryId}
                  onValueChange={(value) => {
                    const event = { target: { value } };
                    register('category_id').onChange(event);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
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

              <div className="space-y-2">
                <Label htmlFor="title">Position Name</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Enter position name"
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
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="config" className="mt-4 space-y-4">
              {categoryFields.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  {selectedCategoryId 
                    ? 'No configuration fields found for this category.'
                    : 'Please select a category first.'}
                </p>
              ) : (
                categoryFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.name}>
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    {renderField(field)}
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update Opportunity' : 'Create Opportunity'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
} 