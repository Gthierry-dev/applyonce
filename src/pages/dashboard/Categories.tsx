
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CategoryCard from '@/components/categories/CategoryCard';
import { useCategories } from '@/hooks/useCategories';
import { Loader2 } from 'lucide-react';

const Categories = () => {
  const { data: categories, isLoading, error, enabledCategories, configuredCategories, handleToggle } = useCategories();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Toggle categories on/off to customize your feed. Click on a category to configure your profile.
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
                enabled={enabledCategories[category.title] || false}
                onToggle={(enabled) => handleToggle(category.title, enabled)}
                configured={configuredCategories[category.title] || false}
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
