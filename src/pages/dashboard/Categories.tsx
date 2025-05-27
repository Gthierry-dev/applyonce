import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CategoryCard from '@/components/categories/CategoryCard';
import { useCategories } from '@/hooks/useCategories';
import { Loader2 } from 'lucide-react';

const Categories = () => {
  const { categories, isLoading } = useCategories();

  return (
    <DashboardLayout>
      <DashboardHeader title="Categories" />
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Browse and manage your categories. Click on a category to view its opportunities.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                title={category.title}
                description={category.description || ''}
                iconName={category.icon_name}
                count={category.count || 0}
                color={category.color}
                enabled={false}
                configured={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No categories found. Please check back later.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Categories;
