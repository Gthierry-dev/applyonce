
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Edit, Trash, Loader2, AlertCircle } from 'lucide-react';
import { iconMap } from '@/data/categories';
import CategoryFormDrawer from '@/components/admin/CategoryFormDrawer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Category {
  id: string;
  title: string;
  description: string | null;
  count: number | null;
  icon_name: string;
  color: string;
  created_at?: string;
  updated_at?: string;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('title');
      
      if (error) {
        throw error;
      }
      
      setCategories(data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again.');
      toast({
        variant: "destructive",
        title: "Error loading categories",
        description: "There was a problem loading the categories. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  const handleEditClick = (category: Category) => {
    setCategoryToEdit(category);
    setIsEditDrawerOpen(true);
  };
  
  const handleEditDrawerClose = () => {
    setIsEditDrawerOpen(false);
    setCategoryToEdit(null);
  };
  
  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    
    setDeleteLoading(true);
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryToDelete.id);
      
      if (error) {
        throw error;
      }
      
      // Update local state to remove the deleted category
      setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
      
      toast({
        title: "Category deleted",
        description: `"${categoryToDelete.title}" has been successfully deleted.`,
      });
    } catch (err) {
      console.error('Error deleting category:', err);
      toast({
        variant: "destructive",
        title: "Error deleting category",
        description: "There was a problem deleting the category. Please try again.",
      });
    } finally {
      setDeleteLoading(false);
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };
  
  const handleCategoryUpdated = (updatedCategory: Category) => {
    // Update the local state with the updated category
    setCategories(categories.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    ));
    setIsEditDrawerOpen(false);
    setCategoryToEdit(null);
  };
  
  const handleCategoryAdded = (newCategory: Category) => {
    // Add the new category to the local state
    setCategories([...categories, newCategory]);
  };
  
  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Manage Categories</h1>
          <CategoryFormDrawer 
            onCategoryAdded={handleCategoryAdded}
          />
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-8 mb-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading categories...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center p-6 border rounded-md bg-destructive/10">
            <AlertCircle className="h-5 w-5 text-destructive mr-2" />
            <p className="text-destructive">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4"
              onClick={fetchCategories}
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            {/* Card View for Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:hidden">
              {filteredCategories.map((category) => {
                const IconComponent = iconMap[category.icon_name];
                return (
                  <Card key={category.id} className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-md ${category.color}`}>
                            {IconComponent && <IconComponent className="h-5 w-5 text-blue-600" />}
                          </div>
                          <div>
                            <h3 className="font-medium text-base">{category.title}</h3>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                            <p className="text-xs mt-1">
                              <span className="text-primary font-medium">{category.count || 0}</span> opportunities
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleEditClick(category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteClick(category)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Table View for Desktop */}
            <div className="hidden md:block overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Icon</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden lg:table-cell">Description</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No categories found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCategories.map((category) => {
                      const IconComponent = iconMap[category.icon_name];
                      return (
                        <TableRow key={category.id}>
                          <TableCell>
                            <div className={`p-2 rounded-md ${category.color} w-9 h-9 flex items-center justify-center`}>
                              {IconComponent && <IconComponent className="h-5 w-5 text-blue-600" />}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{category.title}</TableCell>
                          <TableCell className="hidden lg:table-cell">{category.description}</TableCell>
                          <TableCell>{category.count || 0}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditClick(category)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDeleteClick(category)}
                              >
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        {/* Edit Category Drawer */}
        {categoryToEdit && (
          <CategoryFormDrawer 
            isOpen={isEditDrawerOpen}
            onClose={handleEditDrawerClose}
            isEditing={true}
            initialData={categoryToEdit}
            onCategoryUpdated={handleCategoryUpdated}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Category</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{categoryToDelete?.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteCategory}
                disabled={deleteLoading}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
