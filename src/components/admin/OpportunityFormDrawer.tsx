import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from "@/components/ui/switch"
import { useToast } from '@/hooks/use-toast';
import { Category } from '@/integrations/supabase/client';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DatePicker } from "@/components/ui/date-picker"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { CategoryField } from '@/types/category';

// Extend the form schema to include custom fields
const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  category_id: z.string().uuid({
    message: 'Please select a category.',
  }),
  organization: z.string().min(2, {
    message: 'Organization name must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  salary: z.string().optional(),
  application_url: z.string().url({
    message: 'Please enter a valid URL.',
  }),
  is_remote: z.boolean().default(false),
  posted_date: z.date(),
  expiry_date: z.date(),
  custom_fields: z.record(z.string(), z.any()).optional(),
});

interface OpportunityFormDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  categories: Category[];
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  loading: boolean;
  initialValues?: z.infer<typeof formSchema>;
}

const OpportunityFormDrawer: React.FC<OpportunityFormDrawerProps> = ({
  open,
  setOpen,
  categories,
  onSubmit,
  loading,
  initialValues,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialValues?.category_id || null);
  const [customFields, setCustomFields] = useState<CategoryField[]>([]);
  const [isLoadingFields, setIsLoadingFields] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      category_id: initialValues?.category_id || '',
      organization: initialValues?.organization || '',
      location: initialValues?.location || '',
      salary: initialValues?.salary || '',
      application_url: initialValues?.application_url || '',
      is_remote: initialValues?.is_remote || false,
      posted_date: initialValues?.posted_date || new Date(),
      expiry_date: initialValues?.expiry_date || new Date(),
      custom_fields: initialValues?.custom_fields || {},
    },
    mode: 'onChange',
  });

  // Fetch custom fields when category changes
  useEffect(() => {
    const categoryId = form.watch('category_id');
    if (categoryId) {
      setSelectedCategory(categoryId);
      fetchCustomFields(categoryId);
    }
  }, [form.watch('category_id')]);

  // Load initial values
  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
      if (initialValues.category_id) {
        fetchCustomFields(initialValues.category_id);
      }
    }
  }, [initialValues, form]);

  // Fetch custom fields for the selected category
  const fetchCustomFields = async (categoryId: string) => {
    setIsLoadingFields(true);
    try {
      const { data, error } = await supabase
        .from('category_fields')
        .select('*')
        .eq('category_id', categoryId)
        .order('order', { ascending: true });

      if (error) throw error;
      
      setCustomFields(data || []);
    } catch (error) {
      console.error('Error fetching custom fields:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load custom fields for this category.',
      });
    } finally {
      setIsLoadingFields(false);
    }
  };

  const handleValidSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
      toast({
        title: 'Success',
        description: 'Opportunity saved successfully.',
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('Error saving opportunity:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save opportunity. Please try again.',
      });
    }
  };

  // Render custom field based on its type
  const renderCustomField = (field: CategoryField) => {
    const fieldName = `custom_fields.${field.id}`;
    
    switch (field.type) {
      case 'text':
        return (
          <Controller
            name={fieldName}
            control={form.control}
            render={({ field: formField }) => (
              <Input 
                {...formField}
                placeholder={field.placeholder || field.label}
                required={field.required}
              />
            )}
          />
        );
      case 'textarea':
        return (
          <Controller
            name={fieldName}
            control={form.control}
            render={({ field: formField }) => (
              <Textarea 
                {...formField}
                placeholder={field.placeholder || field.label}
                required={field.required}
              />
            )}
          />
        );
      case 'number':
        return (
          <Controller
            name={fieldName}
            control={form.control}
            render={({ field: formField }) => (
              <Input 
                {...formField}
                type="number"
                placeholder={field.placeholder || field.label}
                required={field.required}
              />
            )}
          />
        );
      case 'select':
        return (
          <Controller
            name={fieldName}
            control={form.control}
            render={({ field: formField }) => (
              <Select
                onValueChange={formField.onChange}
                defaultValue={formField.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder || field.label} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );
      case 'checkbox':
        return (
          <Controller
            name={fieldName}
            control={form.control}
            render={({ field: formField }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={field.id}
                  checked={formField.value}
                  onCheckedChange={formField.onChange}
                />
                <Label htmlFor={field.id}>{field.label}</Label>
              </div>
            )}
          />
        );
      case 'date':
        return (
          <Controller
            name={fieldName}
            control={form.control}
            render={({ field: formField }) => (
              <DatePicker
                date={formField.value ? new Date(formField.value) : undefined}
                onSelect={formField.onChange}
              />
            )}
          />
        );
      case 'file':
        return (
          <Controller
            name={fieldName}
            control={form.control}
            render={({ field: formField }) => (
              <Input 
                {...formField}
                type="file"
                required={field.required}
              />
            )}
          />
        );
      case 'url':
        return (
          <Controller
            name={fieldName}
            control={form.control}
            render={({ field: formField }) => (
              <Input 
                {...formField}
                type="url"
                placeholder={field.placeholder || field.label}
                required={field.required}
              />
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-[800px] sm:max-w-[800px]">
        <SheetHeader>
          <SheetTitle>{initialValues ? 'Edit Opportunity' : 'Create Opportunity'}</SheetTitle>
          <SheetDescription>
            Fill in the details for the opportunity. Fields marked with * are required.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={form.handleSubmit(handleValidSubmit)} className="space-y-6 mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="custom" disabled={!selectedCategory}>
                Custom Fields
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    {...form.register('title')}
                    placeholder="Enter opportunity title"
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category_id">Category *</Label>
                  <Select
                    onValueChange={(value) => form.setValue('category_id', value)}
                    defaultValue={form.getValues('category_id')}
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
                  {form.formState.errors.category_id && (
                    <p className="text-sm text-red-500">{form.formState.errors.category_id.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization *</Label>
                  <Input
                    id="organization"
                    {...form.register('organization')}
                    placeholder="Enter organization name"
                  />
                  {form.formState.errors.organization && (
                    <p className="text-sm text-red-500">{form.formState.errors.organization.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    {...form.register('location')}
                    placeholder="Enter location"
                  />
                  {form.formState.errors.location && (
                    <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    {...form.register('salary')}
                    placeholder="Enter salary range"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="application_url">Application URL *</Label>
                  <Input
                    id="application_url"
                    {...form.register('application_url')}
                    placeholder="Enter application URL"
                  />
                  {form.formState.errors.application_url && (
                    <p className="text-sm text-red-500">{form.formState.errors.application_url.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Posted Date *</Label>
                  <Controller
                    name="posted_date"
                    control={form.control}
                    render={({ field }) => (
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                      />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Expiry Date *</Label>
                  <Controller
                    name="expiry_date"
                    control={form.control}
                    render={({ field }) => (
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                      />
                    )}
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...form.register('description')}
                    placeholder="Enter opportunity description"
                    className="min-h-[100px]"
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                  )}
                </div>

                <div className="col-span-2 flex items-center space-x-2">
                  <Switch
                    id="is_remote"
                    {...form.register('is_remote')}
                  />
                  <Label htmlFor="is_remote">Remote Position</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              {isLoadingFields ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : customFields.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {customFields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id}>
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      {renderCustomField(field)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No custom fields defined for this category.
                </div>
              )}
            </TabsContent>
          </Tabs>

          <SheetFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialValues ? 'Update Opportunity' : 'Create Opportunity'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default OpportunityFormDrawer;
