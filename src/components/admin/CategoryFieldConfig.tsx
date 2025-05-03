
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { PlusCircle, Grip, ChevronDown, ChevronUp, Trash, Settings, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase, CategoryField } from '@/integrations/supabase/client';
import { useCategoryFields } from '@/hooks/useCategoryFields';

export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'date' | 'file' | 'url';

interface CategoryFieldConfigProps {
  categoryId: string;
}

const fieldTypeOptions: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text Input' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'number', label: 'Number' },
  { value: 'select', label: 'Select Dropdown' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'date', label: 'Date Picker' },
  { value: 'file', label: 'File Upload' },
  { value: 'url', label: 'URL Input' },
];

export const CategoryFieldConfig: React.FC<CategoryFieldConfigProps> = ({ categoryId }) => {
  const { toast } = useToast();
  const {
    fields,
    isLoading,
    createField,
    updateField,
    deleteField,
    reorderFields,
  } = useCategoryFields(categoryId);

  const [expandedFieldId, setExpandedFieldId] = useState<string | null>(null);
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonConfig, setJsonConfig] = useState('');

  useEffect(() => {
    if (jsonMode && fields.length > 0) {
      setJsonConfig(JSON.stringify(fields, null, 2));
    }
  }, [jsonMode, fields]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update the display_order for each item
    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index,
    }));
    
    reorderFields.mutate(updatedItems);
  };

  const handleAddField = () => {
    createField.mutate({
      category_id: categoryId,
      name: `field_${Date.now()}`,
      label: 'New Field',
      type: 'text',
      required: false,
      display_order: fields.length,
    });
  };

  const handleUpdateField = (field: CategoryField, updates: Partial<CategoryField>) => {
    updateField.mutate({
      ...field,
      ...updates,
    });
  };

  const handleDeleteField = (fieldId: string) => {
    deleteField.mutate(fieldId);
  };

  const handleImportFromJson = () => {
    try {
      const parsed = JSON.parse(jsonConfig);
      
      if (!Array.isArray(parsed)) {
        throw new Error('JSON must be an array of field configurations');
      }
      
      // Validate each field has required properties
      parsed.forEach((field, index) => {
        if (!field.name || !field.label || !field.type) {
          throw new Error(`Field at position ${index} is missing required properties`);
        }
      });
      
      // Add fields in sequence
      const addFieldsSequentially = async () => {
        for (const field of parsed) {
          await supabase
            .from('category_fields')
            .insert([{
              ...field,
              category_id: categoryId,
              display_order: fields.length + parsed.indexOf(field)
            }]);
        }
        
        // Refresh the fields
        useCategoryFields(categoryId).reorderFields.mutate(fields);
        setJsonMode(false);
        toast({
          title: 'Success',
          description: `Imported ${parsed.length} fields successfully`,
        });
      };
      
      addFieldsSequentially();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to parse JSON',
      });
    }
  };

  const handleExportToJson = () => {
    const json = JSON.stringify(fields, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `category-${categoryId}-fields.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Success',
      description: 'Fields exported successfully',
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (jsonMode) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">JSON Configuration</h3>
          <Button variant="outline" size="sm" onClick={() => setJsonMode(false)}>
            Back to Visual Editor
          </Button>
        </div>
        
        <Textarea
          className="min-h-[400px] font-mono"
          value={jsonConfig}
          onChange={(e) => setJsonConfig(e.target.value)}
          placeholder="Paste JSON configuration here..."
        />
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleExportToJson}>Export</Button>
          <Button onClick={handleImportFromJson}>Import</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Form Fields Configuration</h3>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => setJsonMode(true)}>
            <Code className="mr-2 h-4 w-4" />
            JSON Mode
          </Button>
          <Button size="sm" onClick={handleAddField}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Field
          </Button>
        </div>
      </div>

      {fields.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-muted-foreground mb-4">No fields configured for this category yet</p>
            <Button onClick={handleAddField}>Add Your First Field</Button>
          </CardContent>
        </Card>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={expandedFieldId === field.id ? 'border-primary' : ''}
                      >
                        <CardHeader className="p-3 flex flex-row items-center justify-between">
                          <div className="flex items-center">
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-grab p-1 mr-2"
                            >
                              <Grip className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <CardTitle className="text-sm">{field.label}</CardTitle>
                              <CardDescription className="text-xs">
                                {fieldTypeOptions.find((opt) => opt.value === field.type)?.label || field.type}
                                {field.required && ' • Required'}
                              </CardDescription>
                            </div>
                          </div>
                          
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setExpandedFieldId(expandedFieldId === field.id ? null : field.id)}
                            >
                              {expandedFieldId === field.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteField(field.id)}
                            >
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </CardHeader>

                        {expandedFieldId === field.id && (
                          <CardContent className="p-3 pt-0 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label htmlFor={`field-${field.id}-label`}>Label</Label>
                                <Input
                                  id={`field-${field.id}-label`}
                                  value={field.label}
                                  onChange={(e) => handleUpdateField(field, { label: e.target.value })}
                                  placeholder="Field Label"
                                />
                              </div>
                              
                              <div className="space-y-1">
                                <Label htmlFor={`field-${field.id}-name`}>Name (ID)</Label>
                                <Input
                                  id={`field-${field.id}-name`}
                                  value={field.name}
                                  onChange={(e) => handleUpdateField(field, { name: e.target.value })}
                                  placeholder="field_name"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label htmlFor={`field-${field.id}-type`}>Field Type</Label>
                                <Select
                                  value={field.type}
                                  onValueChange={(value) => handleUpdateField(field, { type: value as FieldType })}
                                >
                                  <SelectTrigger id={`field-${field.id}-type`}>
                                    <SelectValue placeholder="Select a field type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {fieldTypeOptions.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="space-y-1">
                                <Label htmlFor={`field-${field.id}-placeholder`}>Placeholder</Label>
                                <Input
                                  id={`field-${field.id}-placeholder`}
                                  value={field.placeholder || ''}
                                  onChange={(e) => handleUpdateField(field, { placeholder: e.target.value })}
                                  placeholder="Enter placeholder text..."
                                />
                              </div>
                            </div>

                            {field.type === 'select' && (
                              <div className="space-y-1">
                                <Label htmlFor={`field-${field.id}-options`}>Options (one per line)</Label>
                                <Textarea
                                  id={`field-${field.id}-options`}
                                  value={(field.options || []).join('\n')}
                                  onChange={(e) => handleUpdateField(field, { options: e.target.value.split('\n').filter(Boolean) })}
                                  placeholder="Option 1&#10;Option 2&#10;Option 3"
                                  rows={3}
                                />
                              </div>
                            )}

                            <div className="flex items-center space-x-2 pt-2">
                              <Switch
                                id={`field-${field.id}-required`}
                                checked={field.required}
                                onCheckedChange={(checked) => handleUpdateField(field, { required: checked })}
                              />
                              <Label htmlFor={`field-${field.id}-required`}>Required field</Label>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {fields.length > 0 && (
        <div className="flex justify-center pt-4">
          <Button onClick={handleAddField}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Another Field
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryFieldConfig;
