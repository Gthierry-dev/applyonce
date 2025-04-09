
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase, Category } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface CategoryFormProps {
  isEditing?: boolean;
  initialData?: Partial<Category>;
  onSave: (category: Category) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  isEditing = false,
  initialData,
  onSave,
  onCancel
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Category>>({
    title: '',
    description: '',
    icon_name: 'GraduationCap',
    color: 'bg-blue-100',
    count: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        ...initialData
      });
    }
  }, [isEditing, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string | number } }
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.icon_name || !formData.color) {
        throw new Error('Please fill out all required fields');
      }

      const categoryData = {
        title: formData.title!,
        description: formData.description || '',
        icon_name: formData.icon_name!,
        color: formData.color!,
        count: formData.count || 0,
        updated_at: new Date().toISOString()
      };

      let result;

      if (isEditing && initialData?.id) {
        // Update existing category
        const { data, error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', initialData.id)
          .select('*')
          .single();

        if (error) throw error;
        result = data;

        toast({
          title: "Category Updated",
          description: "The category has been successfully updated",
        });
      } else {
        // Create new category
        const { data, error } = await supabase
          .from('categories')
          .insert(categoryData)
          .select('*')
          .single();

        if (error) throw error;
        result = data;

        toast({
          title: "Category Added",
          description: "The category has been successfully created",
        });
      }

      if (result) {
        onSave(result);
      }
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save category",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
        <Input
          id="title"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          placeholder="Enter category title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Short description of this category"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon_name">Icon <span className="text-red-500">*</span></Label>
        <Select
          value={formData.icon_name || ''}
          onValueChange={(value) => handleSelectChange('icon_name', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an icon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GraduationCap">Graduation Cap</SelectItem>
            <SelectItem value="Briefcase">Briefcase</SelectItem>
            <SelectItem value="Award">Award</SelectItem>
            <SelectItem value="Globe">Globe</SelectItem>
            <SelectItem value="banknote">Banknote</SelectItem>
            <SelectItem value="trophy">Trophy</SelectItem>
            <SelectItem value="Building">Building</SelectItem>
            <SelectItem value="Lightbulb">Lightbulb</SelectItem>
            <SelectItem value="Users">Users</SelectItem>
            <SelectItem value="HeartHandshake">Heart Handshake</SelectItem>
            <SelectItem value="PenTool">Pen Tool</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Color <span className="text-red-500">*</span></Label>
        <Select
          value={formData.color || ''}
          onValueChange={(value) => handleSelectChange('color', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bg-blue-100">Blue</SelectItem>
            <SelectItem value="bg-green-100">Green</SelectItem>
            <SelectItem value="bg-purple-100">Purple</SelectItem>
            <SelectItem value="bg-yellow-100">Yellow</SelectItem>
            <SelectItem value="bg-red-100">Red</SelectItem>
            <SelectItem value="bg-indigo-100">Indigo</SelectItem>
            <SelectItem value="bg-orange-100">Orange</SelectItem>
            <SelectItem value="bg-pink-100">Pink</SelectItem>
            <SelectItem value="bg-teal-100">Teal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="count">Opportunity Count</Label>
        <Input
          id="count"
          name="count"
          type="number"
          value={formData.count || 0}
          onChange={(e) => handleChange({ target: { name: 'count', value: parseInt(e.target.value) || 0 } })}
          placeholder="Number of opportunities"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? 'Updating...' : 'Saving...'}
            </>
          ) : (
            isEditing ? 'Update Category' : 'Add Category'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
