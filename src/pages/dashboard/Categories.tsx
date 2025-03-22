
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CategoryCard from '@/components/categories/CategoryCard';
import { categoryData } from '@/data/categories';
import { useCategories } from '@/hooks/useCategories';

const Categories = () => {
  const { enabledCategories, configuredCategories, handleToggle } = useCategories(categoryData);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Toggle categories on/off to customize your feed. Click on a category to configure your profile.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categoryData.map((category) => (
            <CategoryCard 
              key={category.title} 
              {...category} 
              enabled={enabledCategories[category.title] || false}
              onToggle={(enabled) => handleToggle(category.title, enabled)}
              configured={configuredCategories[category.title] || false}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
