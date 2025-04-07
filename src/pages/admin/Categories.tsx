
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Grid3X3, List } from 'lucide-react';
import { supabase, Category } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CategoryCard from '@/components/categories/CategoryCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CategoryFormDrawer from '@/components/admin/CategoryFormDrawer';

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('title');

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

  const filteredCategories = categories.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Manage Categories</h1>
          <CategoryFormDrawer trigger={<Button>Add Category</Button>} />
        </div>

        <div className="flex items-center gap-2">
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
          <div className="flex justify-center py-8">
            <p>Loading categories...</p>
          </div>
        ) : (
          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <Grid3X3 className="h-4 w-4" />
                <span>Grid</span>
              </TabsTrigger>
              <TabsTrigger value="table" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                <span>Table</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredCategories.length === 0 ? (
                  <p className="col-span-full text-center py-8 text-muted-foreground">
                    No categories found
                  </p>
                ) : (
                  filteredCategories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      title={category.title}
                      description={category.description || ''}
                      count={category.count || 0}
                      color={category.color}
                      icon={category.icon_name}
                      onClick={() => {}}
                    />
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="table" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Icon</TableHead>
                      <TableHead>Color</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No categories found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCategories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.title}</TableCell>
                          <TableCell>{category.description || 'N/A'}</TableCell>
                          <TableCell>{category.icon_name}</TableCell>
                          <TableCell>{category.color}</TableCell>
                          <TableCell>{category.count || 0}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
