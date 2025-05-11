import React from 'react';
import { Link } from 'react-router-dom';
import { categoryData, iconMap } from '@/data/categories';

const OpportunitiesDropdown = () => {
  return (
    <div className="fixed inset-x-0 top-16 bg-gradient-to-b from-white via-white/95 to-blue-60/90 backdrop-blur-lg border-b border-t shadow-b shodow-[0_8px_30px_rgb(0,0,0,0.12)] z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[calc(65vh-4rem)] max-h-[36rem] overflow-y-auto">
          <div className="grid grid-cols-12 gap-8 py-6">
            {/* Categories grid */}
            <div className="col-span-8">
              <div className="grid grid-cols-3 gap-4">
                {categoryData.map((category) => {
                  const IconComponent = iconMap[category.iconName];
                  return (
                    <Link
                      key={category.title}
                      to={`/opportunities?category=${encodeURIComponent(category.title)}`}
                      className="group flex items-start p-3 rounded-lg hover:bg-white/50 transition-colors"
                    >
                      <div className="flex gap-3">
                        <div className={`shrink-0 p-2 rounded-md ${category.color} bg-opacity-10`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium group-hover:text-primary transition-colors">{category.title}</div>
                          <p className="text-sm text-muted-foreground mt-0.5">{category.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            
            {/* Featured section */}
            <div className="col-span-4 border-l pl-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Featured Opportunities</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Discover our most popular and trending opportunities
                  </p>
                </div>
                
                <div className="space-y-3">
                  {categoryData.slice(0, 3).map((category) => (
                    <Link
                      key={`featured-${category.title}`}
                      to={`/opportunities?category=${encodeURIComponent(category.title)}`}
                      className="block group"
                    >
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {category.title}
                      </div>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </Link>
                  ))}
                </div>
                
                <Link
                  to="/opportunities"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                >
                  View all opportunities
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesDropdown;