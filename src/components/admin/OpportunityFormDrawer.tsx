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
import { Loader2, Calendar as CalendarIcon, Plus, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { DatePicker } from "@/components/ui/date-picker"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Define field types
type FieldType = 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox' | 'file';

interface CustomField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[]; // For select fields
  placeholder?: string;
}

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
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [isLoadingFields, setIsLoadingFields] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: initialValues ? undefined : zodResolver(formSchema),
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
        .order('created_at', { ascending: true });

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
  const renderCustomField = (field: CustomField) => {
    const fieldName = `custom_fields.${field.id}`;
    
    switch (field.type) {
      case 'text':
        return (
          <Input 
            id={field.id} 
            placeholder={field.placeholder || field.label} 
            {...form.register(fieldName)} 
          />
        );
      case 'textarea':
        return (
          <Textarea 
            id={field.id} 
            placeholder={field.placeholder || field.label} 
            {...form.register(fieldName)} 
          />
        );
      case 'number':
        return (
          <Input 
            id={field.id} 
            type="number" 
            placeholder={field.placeholder || field.label} 
            {...form.register(fieldName)} 
          />
        );
      case 'date':
        return (
          <DatePicker
            onSelect={(date) => form.setValue(fieldName, date || new Date())}
            defaultDate={form.getValues(fieldName)}
          >
            <div className="relative">
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !form.getValues(fieldName) && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {form.getValues(fieldName) ? (
                  format(form.getValues(fieldName), "PPP")
                ) : (
                  <span>{field.placeholder || "Pick a date"}</span>
                )}
              </Button>
            </div>
          </DatePicker>
        );
      case 'select':
        return (
          <Select 
            onValueChange={(value) => form.setValue(fieldName, value)} 
            defaultValue={form.getValues(fieldName)}
          >
            <SelectTrigger id={field.id}>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
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
          <Controller
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <Switch
                id={field.id}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        );
      case 'file':
        return (
          <Input 
            id={field.id} 
            type="file" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                form.setValue(fieldName, file);
              }
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {initialValues ? 'Edit Opportunity' : 'Create New Opportunity'}
          </SheetTitle>
          <SheetDescription>
            {initialValues
              ? 'Edit the opportunity details.'
              : 'Add a new opportunity to the platform.'}
          </SheetDescription>
        </SheetHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="custom" disabled={!selectedCategory || isLoadingFields}>
              Custom Fields
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4 py-4">
            <form onSubmit={form.handleSubmit(handleValidSubmit)} className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" type="text" placeholder="Job Title" {...form.register('title')} />
                  {form.formState.errors.title && (
                    <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Job Description"
                    {...form.register('description')}
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={form.setValue.bind(null, 'category_id')} defaultValue={initialValues?.category_id}>
                    <SelectTrigger id="category">
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
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" type="text" placeholder="Organization Name" {...form.register('organization')} />
                  {form.formState.errors.organization && (
                    <p className="text-sm text-red-500">{form.formState.errors.organization.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" type="text" placeholder="Location" {...form.register('location')} />
                  {form.formState.errors.location && (
                    <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="salary">Salary</Label>
                  <Input id="salary" type="text" placeholder="Salary" {...form.register('salary')} />
                </div>
                <div>
                  <Label htmlFor="application_url">Application URL</Label>
                  <Input
                    id="application_url"
                    type="url"
                    placeholder="https://example.com/apply"
                    {...form.register('application_url')}
                  />
                  {form.formState.errors.application_url && (
                    <p className="text-sm text-red-500">{form.formState.errors.application_url.message}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="is_remote">Remote</Label>
                  <Controller
                    control={form.control}
                    name="is_remote"
                    render={({ field }) => (
                      <Switch
                        id="is_remote"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div>
                  <Label>Posted Date</Label>
                  <DatePicker
                    onSelect={(date) => form.setValue('posted_date', date || new Date())}
                    defaultDate={initialValues?.posted_date}
                  >
                    <div className="relative">
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form.getValues('posted_date') && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.getValues('posted_date') ? (
                          format(form.getValues('posted_date'), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </div>
                  </DatePicker>
                </div>
                <div>
                  <Label>Expiry Date</Label>
                  <DatePicker
                    onSelect={(date) => form.setValue('expiry_date', date || new Date())}
                    defaultDate={initialValues?.expiry_date}
                  >
                    <div className="relative">
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !form.getValues('expiry_date') && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.getValues('expiry_date') ? (
                          format(form.getValues('expiry_date'), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </div>
                  </DatePicker>
                </div>
              </div>
              <SheetFooter>
                <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Opportunity'
                  )}
                </Button>
              </SheetFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4 py-4">
            {isLoadingFields ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading custom fields...</span>
              </div>
            ) : customFields.length === 0 ? (
              <Card>
                <CardContent className="py-6 text-center">
                  <p className="text-muted-foreground">
                    No custom fields defined for this category.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Custom fields can be configured in the Categories section.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  These fields will be required when users apply for this opportunity.
                </p>
                <Separator />
                {customFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={field.id}>
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                    </div>
                    {renderCustomField(field)}
                  </div>
                ))}
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("basic")}>
                    Back to Basic Info
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Opportunity'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default OpportunityFormDrawer;
