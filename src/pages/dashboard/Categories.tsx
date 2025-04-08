
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CategoryCard from '@/components/categories/CategoryCard';
import { useCategories } from '@/hooks/useCategories';
import { Skeleton } from '@/components/ui/skeleton';

const Categories = () => {
  const { data: categories, isLoading, enabledCategories, configuredCategories, handleToggle } = useCategories();

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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="border rounded-md p-4 space-y-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                title={category.title}
                description={category.description || ""}
                count={category.count || 0}
                iconName={category.icon_name}
                color={category.color}
                enabled={enabledCategories[category.title] || false}
                onToggle={(enabled) => handleToggle(category.title, enabled)}
                configured={configuredCategories[category.title] || false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories available. Please check back later.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Categories;
