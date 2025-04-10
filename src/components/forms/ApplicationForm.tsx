import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import FormField from './FormField';
import { FieldType } from '@/components/admin/CategoryFieldConfig';

interface CustomField {
  id: string;
  category_id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  order: number;
}

interface ApplicationFormProps {
  categoryId: string;
  opportunityId: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  categoryId,
  opportunityId,
  onSubmit,
  onCancel,
}) => {
  const [fields, setFields] = useState<CustomField[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Create a dynamic schema based on the fields
  const createSchema = (fields: CustomField[]) => {
    const schemaFields: Record<string, any> = {};
    
    fields.forEach(field => {
      let fieldSchema;
      
      switch (field.type) {
        case 'text':
        case 'textarea':
        case 'file':
        case 'url':
        case 'date':
          fieldSchema = z.string();
          break;
        case 'number':
          fieldSchema = z.number();
          break;
        case 'select':
          fieldSchema = z.string().refine(
            (val) => field.options?.includes(val),
            { message: 'Please select a valid option' }
          );
          break;
        case 'checkbox':
          fieldSchema = z.boolean();
          break;
        default:
          fieldSchema = z.string();
      }

      if (field.required) {
        fieldSchema = fieldSchema.nonempty({ message: 'This field is required' });
      } else {
        fieldSchema = fieldSchema.optional();
      }

      schemaFields[field.id] = fieldSchema;
    });

    return z.object(schemaFields);
  };

  const form = useForm({
    resolver: zodResolver(createSchema(fields)),
  });

  useEffect(() => {
    fetchFields();
  }, [categoryId]);

  const fetchFields = async () => {
    try {
      const { data, error } = await supabase
        .from('category_fields')
        .select('*')
        .eq('category_id', categoryId)
        .order('order', { ascending: true });

      if (error) throw error;
      setFields(data || []);
    } catch (error) {
      console.error('Error fetching fields:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load application form fields.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      // Here you would typically save the application data
      // For now, we'll just pass it to the parent component
      onSubmit(data);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading application form...</span>
      </div>
    );
  }

  if (fields.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Application Form</CardTitle>
          <CardDescription>
            No additional fields required for this opportunity.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => onSubmit({})}>Submit Application</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardHeader>
          <CardTitle>Application Form</CardTitle>
          <CardDescription>
            Please fill out all required fields to complete your application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field) => (
            <FormField
              key={field.id}
              id={field.id}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              options={field.options?.map(opt => ({ label: opt, value: opt }))}
              value={form.watch(field.id)}
              onChange={(value) => form.setValue(field.id, value)}
              error={form.formState.errors[field.id]?.message as string}
            />
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ApplicationForm; 