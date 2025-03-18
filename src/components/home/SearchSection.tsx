
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchSection = () => {
  const categories = ['Grants', 'Jobs', 'Scholarships', 'Competitions', 'Internships'];
  
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Find Your Next Opportunity</h2>
            <p className="text-muted-foreground">Browse thousands of opportunities across various categories</p>
          </div>
          <div className="flex gap-2 p-1.5 rounded-lg bg-secondary shadow-sm">
            <Input 
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" 
              placeholder="Search opportunities..." 
            />
            <Button className="shadow-sm">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm" className="rounded-full">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
