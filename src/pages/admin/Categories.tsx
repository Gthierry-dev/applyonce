
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Edit, Trash } from 'lucide-react';
import { iconMap } from '@/data/categories';
import CategoryFormDrawer from '@/components/admin/CategoryFormDrawer';

const categories = [
  { id: 1, title: 'Scholarships', description: 'Financial aid for students', count: 12, iconName: 'graduationCap', color: 'bg-blue-100' },
  { id: 2, title: 'Grants', description: 'Funding for research and projects', count: 8, iconName: 'banknote', color: 'bg-green-100' },
  { id: 3, title: 'Internships', description: 'Work experience opportunities', count: 15, iconName: 'briefcase', color: 'bg-purple-100' },
  { id: 4, title: 'Awards', description: 'Recognition for achievements', count: 5, iconName: 'trophy', color: 'bg-yellow-100' },
  { id: 5, title: 'Exchanges', description: 'International programs', count: 7, iconName: 'globe', color: 'bg-red-100' },
  { id: 6, title: 'Fellowships', description: 'Advanced study programs', count: 6, iconName: 'award', color: 'bg-indigo-100' },
];

const AdminCategories = () => {
  const [categoryToEdit, setCategoryToEdit] = useState<typeof categories[0] | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  
  const handleEditClick = (category: typeof categories[0]) => {
    setCategoryToEdit(category);
    setIsEditDrawerOpen(true);
  };
  
  const handleEditDrawerClose = () => {
    setIsEditDrawerOpen(false);
    setCategoryToEdit(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Manage Categories</h1>
          <CategoryFormDrawer />
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-8 mb-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const IconComponent = iconMap[category.iconName];
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
                          <span className="text-primary font-medium">{category.count}</span> opportunities
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
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Edit Category Drawer */}
        {categoryToEdit && (
          <CategoryFormDrawer 
            isOpen={isEditDrawerOpen}
            onClose={handleEditDrawerClose}
            isEditing={true}
            initialData={categoryToEdit}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
