
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
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
  company: z.string().min(2, {
    message: 'Company name must be at least 2 characters.',
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: initialValues ? undefined : zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      category_id: initialValues?.category_id || '',
      company: initialValues?.company || '',
      location: initialValues?.location || '',
      salary: initialValues?.salary || '',
      application_url: initialValues?.application_url || '',
      is_remote: initialValues?.is_remote || false,
      posted_date: initialValues?.posted_date || new Date(),
      expiry_date: initialValues?.expiry_date || new Date(),
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

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

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="text-foreground">
        <DrawerHeader>
          <DrawerTitle>
            {initialValues ? 'Edit Opportunity' : 'Create New Opportunity'}
          </DrawerTitle>
          <DrawerDescription>
            {initialValues
              ? 'Edit the opportunity details.'
              : 'Add a new opportunity to the platform.'}
          </DrawerDescription>
        </DrawerHeader>
        <form onSubmit={form.handleSubmit(handleValidSubmit)} className="p-4 space-y-4">
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
              <Label htmlFor="company">Company</Label>
              <Input id="company" type="text" placeholder="Company Name" {...form.register('company')} />
              {form.formState.errors.company && (
                <p className="text-sm text-red-500">{form.formState.errors.company.message}</p>
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
          <DrawerFooter>
            <Button variant="outline" className="mr-2" onClick={() => setOpen(false)}>
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
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default OpportunityFormDrawer;
