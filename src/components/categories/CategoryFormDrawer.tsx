import React, { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CategoryFormDrawerProps {
  categoryName: string;
  categoryIcon: React.ReactNode;
  trigger?: React.ReactNode;
}

interface FormField {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

interface FormData {
  [key: string]: string | boolean | number | string[];
}

const CategoryFormDrawer: React.FC<CategoryFormDrawerProps> = ({
  categoryName,
  categoryIcon,
  trigger,
}) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [existingResponseId, setExistingResponseId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchFields();
      fetchExistingResponse();
    }
  }, [isOpen]);

  const fetchFields = async () => {
    try {
      setIsLoading(true);
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('title', categoryName)
        .single();

      if (!categoryData) throw new Error('Category not found');

      const { data, error } = await supabase
        .from('category_fields')
        .select('*')
        .eq('category_id', categoryData.id)
        .order('order');

      if (error) throw error;
      setFields(data || []);
      
      // Initialize form data with empty values
      const initialData: FormData = {};
      (data || []).forEach(field => {
        if (field.type === 'checkbox') {
          initialData[field.name] = false;
        } else if (field.type === 'multiselect') {
          initialData[field.name] = [];
        } else {
          initialData[field.name] = '';
        }
      });
      setFormData(initialData);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch form fields',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchExistingResponse = async () => {
    try {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('title', categoryName)
        .single();

      if (!categoryData) return;

      const { data: responseData, error } = await supabase
        .from('category_responses')
        .select('*')
        .eq('category_id', categoryData.id)
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"

      if (responseData) {
        setExistingResponseId(responseData.id);
        setFormData(responseData.responses);
      }
    } catch (error) {
      console.error('Error fetching existing response:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('title', categoryName)
        .single();

      if (!categoryData) throw new Error('Category not found');

      const userId = (await supabase.auth.getUser()).data.user?.id;
      if (!userId) throw new Error('User not authenticated');

      if (existingResponseId) {
        // Update existing response
        const { error } = await supabase
          .from('category_responses')
          .update({
            responses: formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingResponseId);

        if (error) throw error;
      } else {
        // Create new response
        const { error } = await supabase
          .from('category_responses')
          .insert([{
            category_id: categoryData.id,
            user_id: userId,
            responses: formData,
          }]);

        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: 'Form submitted successfully',
      });

      setIsOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit form',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            id={field.name}
            value={formData[field.name] as string || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case 'select':
        return (
          <Select
            value={formData[field.name] as string || ''}
            onValueChange={(value) => setFormData({ ...formData, [field.name]: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
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
      case 'multiselect':
        return (
          <Select
            value={(formData[field.name] as string[] || []).join(',')}
            onValueChange={(value) => {
              const values = value.split(',').filter(Boolean);
              setFormData({ ...formData, [field.name]: values });
            }}
            multiple
          >
            <SelectTrigger>
              <SelectValue placeholder="Select options" />
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
          <Checkbox
            id={field.name}
            checked={formData[field.name] as boolean || false}
            onCheckedChange={(checked) => setFormData({ ...formData, [field.name]: checked })}
            required={field.required}
          />
        );
      case 'radio':
        return (
          <RadioGroup
            value={formData[field.name] as string || ''}
            onValueChange={(value) => setFormData({ ...formData, [field.name]: value })}
            required={field.required}
          >
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.name}-${option}`} />
                <Label htmlFor={`${field.name}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'range':
        return (
          <div className="space-y-2">
            <Slider
              value={[formData[field.name] as number || 0]}
              onValueChange={([value]) => setFormData({ ...formData, [field.name]: value })}
              min={field.min}
              max={field.max}
              step={field.step}
            />
            <div className="text-sm text-muted-foreground">
              {formData[field.name] || 0}
            </div>
          </div>
        );
      default:
        return (
          <Input
            id={field.name}
            type={field.type}
            value={formData[field.name] as string || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            placeholder={field.placeholder}
            required={field.required}
            min={field.min}
            max={field.max}
            step={field.step}
          />
        );
    }
  };

  const DrawerComponent = isMobile ? Drawer : Sheet;
  const DrawerContentComponent = isMobile ? DrawerContent : SheetContent;
  const DrawerHeaderComponent = isMobile ? DrawerHeader : SheetHeader;
  const DrawerTitleComponent = isMobile ? DrawerTitle : SheetTitle;
  const DrawerDescriptionComponent = isMobile ? DrawerDescription : SheetDescription;
  const DrawerTriggerComponent = isMobile ? DrawerTrigger : SheetTrigger;

  return (
    <DrawerComponent open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTriggerComponent asChild>
        {trigger}
      </DrawerTriggerComponent>
      <DrawerContentComponent className="w-full sm:w-[540px] overflow-y-auto">
        <DrawerHeaderComponent className="space-y-4 pb-4 border-b">
          <div className="flex items-center gap-3">
            {categoryIcon}
            <DrawerTitleComponent>
              Configure {categoryName}
            </DrawerTitleComponent>
          </div>
          <DrawerDescriptionComponent>
            {existingResponseId 
              ? 'Update your preferences for this category.'
              : 'Please fill out the form below to configure your preferences for this category.'}
          </DrawerDescriptionComponent>
        </DrawerHeaderComponent>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              {renderField(field)}
            </div>
          ))}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : existingResponseId ? 'Update Configuration' : 'Save Configuration'}
            </Button>
          </div>
        </form>
      </DrawerContentComponent>
    </DrawerComponent>
  );
};

export default CategoryFormDrawer;
