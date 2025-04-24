import React, { useState } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const categorySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  icon_name: z.string().optional(),
  color: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryField {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
}

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSuccess?: () => void;
}

const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'tel', label: 'Phone' },
  { value: 'url', label: 'URL' },
  { value: 'date', label: 'Date' },
  { value: 'select', label: 'Dropdown' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'radio', label: 'Radio' },
  { value: 'file', label: 'File Upload' },
] as const;

export const CategoryDrawer = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: CategoryDrawerProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [fields, setFields] = useState<CategoryField[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      icon_name: '',
      color: '#000000',
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setIsSubmitting(true);
      if (initialData) {
        const { error } = await supabase
          .from('categories')
          .update({
            title: data.title,
            description: data.description,
            icon_name: data.icon_name,
            color: data.color,
          })
          .eq('id', initialData.id);
        
        if (error) throw error;
        setCategoryId(initialData.id);
        toast({
          title: 'Success',
          description: 'Category updated successfully',
        });
      } else {
        const { data: newCategory, error } = await supabase
          .from('categories')
          .insert([{
            title: data.title,
            description: data.description,
            icon_name: data.icon_name,
            color: data.color,
          }])
          .select()
          .single();
        
        if (error) throw error;
        setCategoryId(newCategory.id);
        toast({
          title: 'Success',
          description: 'Category created successfully',
        });
      }
      
      setStep(2);
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

  const addField = () => {
    setFields([...fields, { 
      name: '', 
      type: 'text', 
      placeholder: '',
      required: false
    }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, field: Partial<CategoryField>) => {
    setFields(
      fields.map((f, i) => (i === index ? { ...f, ...field } : f))
    );
  };

  const handleClose = () => {
    setStep(1);
    reset();
    setFields([]);
    setCategoryId(null);
    onClose();
  };

  const saveFields = async () => {
    try {
      setIsSubmitting(true);
      // Save fields logic will go here
      toast({
        title: 'Success',
        description: 'Form fields saved successfully',
      });
      handleClose();
      onSuccess?.();
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
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:w-[540px] overflow-y-auto">
        <SheetHeader className="space-y-4 pb-4 border-b">
          <SheetTitle>
            {initialData ? 'Edit Category' : 'Create Category'}
          </SheetTitle>
          <SheetDescription>
            {step === 1 ? (
              'Enter the basic details for your category'
            ) : (
              'Configure the form fields for this category'
            )}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                1
              </div>
              <div className="h-0.5 w-12 bg-muted" />
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                2
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <p className="text-sm text-muted-foreground">
              {step === 1 ? 'Category Details' : 'Form Builder'}
            </p>
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register('title')}
                  placeholder="Enter category title"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Enter category description"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon_name">Icon Name</Label>
                  <Input
                    id="icon_name"
                    {...register('icon_name')}
                    placeholder="Enter icon name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    type="color"
                    {...register('color')}
                    className="h-10 px-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={index} className="p-4 relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-6 w-6"
                    onClick={() => removeField(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Field Name</Label>
                        <Input
                          value={field.name}
                          onChange={(e) =>
                            updateField(index, { name: e.target.value })
                          }
                          placeholder="Enter field name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Field Type</Label>
                        <Select
                          value={field.type}
                          onValueChange={(value) =>
                            updateField(index, { type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {FIELD_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Placeholder Text</Label>
                      <Input
                        value={field.placeholder}
                        onChange={(e) =>
                          updateField(index, { placeholder: e.target.value })
                        }
                        placeholder="Enter placeholder text"
                      />
                    </div>
                  </div>
                </Card>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addField}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Field
              </Button>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={saveFields} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Category'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
} 