import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, GripVertical, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input as ShadcnInput } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';

interface CategoryFormProps {
  categoryId: string;
}

const fieldTypes = [
  'text',
  'textarea',
  'number',
  'select',
  'checkbox',
  'date',
  'file',
  'url',
  'email',
  'tel',
  'radio',
  'multiselect',
  'range',
  'color',
  'time',
  'datetime-local'
] as const;

type FieldType = typeof fieldTypes[number];

interface ValidationRule {
  type: string;
  value?: any;
  message: string;
}

interface FormField {
  id: number;
  category_id: string;
  label: string;
  name: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  order: number;
  validation_rules?: ValidationRule[];
  conditional_field?: {
    field_id: string;
    value: string | number | boolean;
  };
}

const validationTypes = [
  { value: 'required', label: 'Required' },
  { value: 'minLength', label: 'Minimum Length' },
  { value: 'maxLength', label: 'Maximum Length' },
  { value: 'pattern', label: 'Pattern (Regex)' },
  { value: 'min', label: 'Minimum Value' },
  { value: 'max', label: 'Maximum Value' },
  { value: 'email', label: 'Email Format' },
  { value: 'url', label: 'URL Format' },
  { value: 'phone', label: 'Phone Number' },
  { value: 'custom', label: 'Custom Validation' },
];

export default function CategoryForm({ categoryId }: CategoryFormProps) {
  const { toast } = useToast();
  const [fields, setFields] = useState<FormField[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentField, setCurrentField] = useState<Partial<FormField>>({
    category_id: categoryId,
    label: '',
    name: '',
    type: 'text',
    placeholder: '',
    required: false,
    options: [],
    order: 0,
    validation_rules: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [showConditional, setShowConditional] = useState(false);

  useEffect(() => {
    if (categoryId) {
      fetchFields();
    }
  }, [categoryId]);

  const fetchFields = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('category_fields')
        .select('*')
        .eq('category_id', categoryId)
        .order('order');

      if (error) throw error;

      // Transform the data to match our FormField interface
      const transformedData = (data || []).map((field: any) => ({
        ...field,
        type: field.type as FieldType,
        order: field.order || 0,
        validation_rules: field.validation_rules || [],
      }));

      setFields(transformedData);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch fields',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddField = async () => {
    if (!currentField.label || !currentField.type) return;

    try {
      setIsLoading(true);
      const newField = {
        ...currentField,
        category_id: categoryId,
        name: currentField.label.toLowerCase().replace(/\s+/g, '_'),
        order: fields.length,
      };

      const { data, error } = await supabase
        .from('category_fields')
        .insert([newField])
        .select()
        .single();

      if (error) throw error;

      // Transform the response data to match our FormField interface
      const transformedData = {
        ...data,
        type: data.type as FieldType,
        order: data.order || fields.length,
        validation_rules: data.validation_rules || [],
      };

      setFields([...fields, transformedData]);
      setCurrentField({
        category_id: categoryId,
        label: '',
        name: '',
        type: 'text',
        placeholder: '',
        required: false,
        options: [],
        order: fields.length + 1,
        validation_rules: [],
      });
      setShowValidation(false);
      setShowConditional(false);

      toast({
        title: 'Success',
        description: 'Field added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add field',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteField = async (fieldId: number) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('category_fields')
        .delete()
        .eq('id', fieldId);

      if (error) throw error;

      setFields(fields.filter(field => field.id !== fieldId));
      toast({
        title: 'Success',
        description: 'Field deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete field',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReorderFields = async (draggedId: number, targetId: number) => {
    const draggedIndex = fields.findIndex(field => field.id === draggedId);
    const targetIndex = fields.findIndex(field => field.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    const newFields = [...fields];
    const [draggedField] = newFields.splice(draggedIndex, 1);
    newFields.splice(targetIndex, 0, draggedField);

    const updatedFields = newFields.map((field, index) => ({
      ...field,
      order: index,
    }));

    setFields(updatedFields);

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('category_fields')
        .upsert(updatedFields.map(({ id, order }) => ({ id, order })));

      if (error) throw error;
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to reorder fields',
        variant: 'destructive',
      });
      await fetchFields();
    } finally {
      setIsLoading(false);
    }
  };

  const addValidationRule = () => {
    setCurrentField({
      ...currentField,
      validation_rules: [
        ...(currentField.validation_rules || []),
        { type: 'required', message: 'This field is required' }
      ]
    });
  };

  const removeValidationRule = (index: number) => {
    setCurrentField({
      ...currentField,
      validation_rules: currentField.validation_rules?.filter((_, i) => i !== index)
    });
  };

  const updateValidationRule = (index: number, rule: ValidationRule) => {
    const updatedRules = [...(currentField.validation_rules || [])];
    updatedRules[index] = rule;
    setCurrentField({
      ...currentField,
      validation_rules: updatedRules
    });
  };

  const filteredFields = fields.filter(field => 
    field.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    field.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fields..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={currentField.label}
              onChange={(e) => setCurrentField({
                ...currentField,
                label: e.target.value
              })}
              placeholder="Field name"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={currentField.type}
              onValueChange={(value) => setCurrentField({
                ...currentField,
                type: value as FieldType
              })}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>
              <SelectContent>
                {fieldTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Example</Label>
            <Input
              value={currentField.placeholder}
              onChange={(e) => setCurrentField({
                ...currentField,
                placeholder: e.target.value
              })}
              placeholder="Placeholder text"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={currentField.required}
                onCheckedChange={(checked) => setCurrentField({
                  ...currentField,
                  required: checked as boolean
                })}
              />
              <Label htmlFor="required">Required</Label>
            </div>
          </div>

          {['select', 'radio', 'multiselect'].includes(currentField.type || '') && (
            <div className="space-y-2">
              <Label>Options</Label>
              <Textarea
                value={currentField.options?.join('\n') || ''}
                onChange={(e) => setCurrentField({
                  ...currentField,
                  options: e.target.value.split('\n').filter(Boolean)
                })}
                placeholder="Enter options (one per line)"
                rows={4}
              />
            </div>
          )}

          {['number', 'range'].includes(currentField.type || '') && (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Min</Label>
                <Input
                  type="number"
                  value={currentField.min}
                  onChange={(e) => setCurrentField({
                    ...currentField,
                    min: parseFloat(e.target.value)
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Max</Label>
                <Input
                  type="number"
                  value={currentField.max}
                  onChange={(e) => setCurrentField({
                    ...currentField,
                    max: parseFloat(e.target.value)
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Step</Label>
                <Input
                  type="number"
                  value={currentField.step}
                  onChange={(e) => setCurrentField({
                    ...currentField,
                    step: parseFloat(e.target.value)
                  })}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setShowValidation(!showValidation)}
            >
              {showValidation ? 'Hide Validation Rules' : 'Show Validation Rules'}
            </Button>
            {showValidation && (
              <div className="space-y-2 p-4 border rounded-md">
                <div className="flex justify-between items-center">
                  <Label>Validation Rules</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addValidationRule}
                  >
                    Add Rule
                  </Button>
                </div>
                {currentField.validation_rules?.map((rule, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Select
                      value={rule.type}
                      onValueChange={(value) => updateValidationRule(index, {
                        ...rule,
                        type: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rule type" />
                      </SelectTrigger>
                      <SelectContent>
                        {validationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {['minLength', 'maxLength', 'min', 'max'].includes(rule.type) && (
                      <Input
                        type="number"
                        value={rule.value}
                        onChange={(e) => updateValidationRule(index, {
                          ...rule,
                          value: parseFloat(e.target.value)
                        })}
                        className="w-20"
                      />
                    )}
                    {rule.type === 'pattern' && (
                      <Input
                        value={rule.value}
                        onChange={(e) => updateValidationRule(index, {
                          ...rule,
                          value: e.target.value
                        })}
                        placeholder="Regex pattern"
                      />
                    )}
                    <Input
                      value={rule.message}
                      onChange={(e) => updateValidationRule(index, {
                        ...rule,
                        message: e.target.value
                      })}
                      placeholder="Error message"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeValidationRule(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setShowConditional(!showConditional)}
            >
              {showConditional ? 'Hide Conditional Logic' : 'Show Conditional Logic'}
            </Button>
            {showConditional && (
              <div className="space-y-2 p-4 border rounded-md">
                <Label>Show this field when:</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={currentField.conditional_field?.field_id}
                    onValueChange={(value) => setCurrentField({
                      ...currentField,
                      conditional_field: {
                        field_id: value,
                        value: currentField.conditional_field?.value || ''
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((field) => (
                        <SelectItem key={field.id} value={field.id!.toString()}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    value={currentField.conditional_field?.value?.toString() || ''}
                    onChange={(e) => setCurrentField({
                      ...currentField,
                      conditional_field: {
                        ...currentField.conditional_field!,
                        value: e.target.value
                      }
                    })}
                    placeholder="Value"
                  />
                </div>
              </div>
            )}
          </div>

          <Button
            type="button"
            className="w-full"
            onClick={handleAddField}
            disabled={!currentField.label || !currentField.type || isLoading}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add field
          </Button>
        </CardContent>
      </Card>

      {filteredFields.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Form Fields</h3>
          <div className="space-y-2">
            {filteredFields.map((field, index) => (
              <Card 
                key={field.id || index} 
                className="bg-card"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('fieldId', field.id.toString())}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const draggedId = parseInt(e.dataTransfer.getData('fieldId'));
                  if (draggedId && field.id) {
                    handleReorderFields(draggedId, field.id);
                  }
                }}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                      <div>
                        <p className="font-medium">{field.label}</p>
                        <p className="text-sm text-muted-foreground">
                          Type: {field.type}
                          {field.placeholder && ` • Example: ${field.placeholder}`}
                          {field.required && ` • Required`}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteField(field.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 