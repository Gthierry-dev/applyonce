
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, PenLine, Trash, FilePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase, Category } from '@/integrations/supabase/client';
import { CategoryFormDrawer } from '@/components/admin/CategoryFormDrawer';
import CategoryFieldConfig from '@/components/admin/CategoryFieldConfig';

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [activeTab, setActiveTab] = useState('categories');
  const [selectedCategoryForFields, setSelectedCategoryForFields] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('title', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load categories',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setDrawerOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setDrawerOpen(true);
  };

  const handleConfigureFields = (category: Category) => {
    setSelectedCategoryForFields(category.id);
    setActiveTab('fields');
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      });

      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete category',
        variant: 'destructive',
      });
    }
  };

  const handleCreateSuccess = (newCategory: Category) => {
    setCategories([...categories, newCategory]);
    setDrawerOpen(false);
  };

  const handleUpdateSuccess = (updatedCategory: Category) => {
    setCategories(
      categories.map(category => 
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setDrawerOpen(false);
  };

  const filteredCategories = categories.filter(
    category => category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSelectedCategoryDetails = () => {
    if (!selectedCategoryForFields) return null;
    return categories.find(c => c.id === selectedCategoryForFields);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <Button onClick={handleAddCategory}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger 
              value="fields" 
              disabled={!selectedCategoryForFields}
            >
              Custom Fields
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading categories...</div>
            ) : filteredCategories.length === 0 ? (
              <div className="text-center py-8">No categories found</div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Icon</TableHead>
                      <TableHead>Color</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.title}</TableCell>
                        <TableCell>{category.icon_name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div 
                              className={`w-4 h-4 rounded-full ${category.color}`}
                            ></div>
                            <span>{category.color}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleConfigureFields(category)}
                              title="Configure fields"
                            >
                              <FilePlus className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleEditCategory(category)}
                            >
                              <PenLine className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="fields">
            {selectedCategoryForFields ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Custom Fields for: {getSelectedCategoryDetails()?.title}
                  </h2>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('categories')}
                  >
                    Back to Categories
                  </Button>
                </div>
                
                <CategoryFieldConfig 
                  categoryId={selectedCategoryForFields} 
                  categoryName={getSelectedCategoryDetails()?.title}
                />
              </div>
            ) : (
              <div className="text-center py-8">
                Please select a category to configure fields
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <CategoryFormDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        selectedCategory={selectedCategory}
        onCreateSuccess={handleCreateSuccess}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </AdminLayout>
  );
};

export default AdminCategories;
