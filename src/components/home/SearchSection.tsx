
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const SearchSection = () => {
  const navigate = useNavigate();
  const categories = [
    { name: 'Jobs', route: '/categories?category=jobs' },
    { name: 'Internships', route: '/categories?category=internships' },
    { name: 'Grants', route: '/categories?category=grants' },
    { name: 'Scholarships', route: '/categories?category=scholarships' },
    { name: 'Competitions', route: '/categories?category=competitions' }
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/opportunities');
  };
  
  const handleCategoryClick = (route: string) => {
    navigate(route);
  };
  
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Find Your Next Opportunity</h2>
            <p className="text-muted-foreground">Browse thousands of opportunities across various categories</p>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2 p-1.5 rounded-lg bg-secondary shadow-sm">
            <Input 
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" 
              placeholder="Search opportunities..." 
            />
            <Button type="submit" className="shadow-sm">
              <Search className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </form>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {categories.map((category) => (
              <Button 
                key={category.name} 
                variant="outline" 
                size="sm" 
                className="rounded-full"
                onClick={() => handleCategoryClick(category.route)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
