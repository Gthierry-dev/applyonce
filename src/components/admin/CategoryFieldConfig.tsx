import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { PlusCircle, Trash2 } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type FieldType = 'text' | 'textarea' | 'file' | 'url' | 'date' | 'select' | 'checkbox' | 'number';

export interface CustomField {
  id?: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  category_id: string;
  options?: string[];
  placeholder?: string;
}

interface CategoryFieldConfigProps {
  categoryId: string;
  categoryName?: string;
}

const CategoryFieldConfig: React.FC<CategoryFieldConfigProps> = ({ categoryId, categoryName }) => {
  const [fields, setFields] = useState<CustomField[]>([]);
  const [loading, setLoading] = useState(false);
  const [newField, setNewField] = useState<CustomField>({
    name: '',
    label: '',
    type: 'text',
    required: false,
    category_id: categoryId,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (categoryId) {
      fetchCategoryFields();
    }
  }, [categoryId]);

  const fetchCategoryFields = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('category_fields')
        .select('*')
        .eq('category_id', categoryId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setFields(data || []);
    } catch (error) {
      console.error('Error fetching category fields:', error);
      toast({
        title: 'Error',
        description: 'Failed to load category fields',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddField = async () => {
    try {
      if (!newField.name || !newField.label) {
        toast({
          title: 'Validation Error',
          description: 'Name and label are required',
          variant: 'destructive',
        });
        return;
      }

      // Convert field name to safe format
      const safeName = newField.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
      
      setLoading(true);
      const { data, error } = await supabase
        .from('category_fields')
        .insert([{
          ...newField,
          name: safeName,
          category_id: categoryId,
          options: newField.type === 'select' ? (newField.options || []) : null
        }])
        .select();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Field added successfully',
      });

      setFields([...fields, data[0]]);
      
      // Reset new field form
      setNewField({
        name: '',
        label: '',
        type: 'text',
        required: false,
        category_id: categoryId,
      });
    } catch (error) {
      console.error('Error adding field:', error);
      toast({
        title: 'Error',
        description: 'Failed to add field',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveField = async (fieldId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('category_fields')
        .delete()
        .eq('id', fieldId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Field removed successfully',
      });

      setFields(fields.filter(field => field.id !== fieldId));
    } catch (error) {
      console.error('Error removing field:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove field',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Custom Fields for {categoryName || 'Category'}</CardTitle>
        <CardDescription>
          Configure custom input fields that applicants must fill when applying for 
          opportunities in this category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Existing fields */}
          {fields.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Existing Fields</h3>
              <div className="grid gap-4">
                {fields.map((field) => (
                  <div key={field.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{field.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {field.type} • {field.required ? 'Required' : 'Optional'}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => field.id && handleRemoveField(field.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No custom fields configured yet
            </div>
          )}

          {/* Add new field form */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-sm font-medium">Add New Field</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fieldName">Field Name</Label>
                  <Input
                    id="fieldName"
                    value={newField.name}
                    onChange={(e) => setNewField({...newField, name: e.target.value})}
                    placeholder="e.g. cv_upload"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldLabel">Display Label</Label>
                  <Input
                    id="fieldLabel"
                    value={newField.label}
                    onChange={(e) => setNewField({...newField, label: e.target.value})}
                    placeholder="e.g. CV Upload"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fieldType">Field Type</Label>
                  <Select 
                    value={newField.type} 
                    onValueChange={(value) => setNewField({
                      ...newField, 
                      type: value as FieldType,
                      options: value === 'select' ? [''] : undefined
                    })}
                  >
                    <SelectTrigger id="fieldType">
                      <SelectValue placeholder="Select field type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="textarea">Text Area</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="file">File Upload</SelectItem>
                      <SelectItem value="url">URL</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="select">Dropdown</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldRequired">Required Field</Label>
                  <div className="flex items-center h-10 space-x-2">
                    <Switch
                      id="fieldRequired"
                      checked={newField.required}
                      onCheckedChange={(checked) => setNewField({...newField, required: checked})}
                    />
                    <Label htmlFor="fieldRequired" className="cursor-pointer">
                      {newField.required ? 'Required' : 'Optional'}
                    </Label>
                  </div>
                </div>
              </div>

              {newField.type === 'select' && (
                <div className="space-y-2">
                  <Label>Dropdown Options (one per line)</Label>
                  <textarea
                    className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={(newField.options || []).join('\n')}
                    onChange={(e) => setNewField({
                      ...newField, 
                      options: e.target.value.split('\n').filter(Boolean)
                    })}
                    placeholder="Option 1&#10;Option 2&#10;Option 3"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="fieldPlaceholder">Placeholder (optional)</Label>
                <Input
                  id="fieldPlaceholder"
                  value={newField.placeholder || ''}
                  onChange={(e) => setNewField({...newField, placeholder: e.target.value})}
                  placeholder="e.g. Enter your GitHub URL"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleAddField} 
          disabled={loading}
          className="w-full"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Field
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryFieldConfig;
