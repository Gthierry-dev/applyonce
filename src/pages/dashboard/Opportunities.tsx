import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import OpportunityCard from '@/components/cards/OpportunityCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { useOpportunities } from '@/hooks/useOpportunities';
import { useCategories } from '@/hooks/useCategories';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose,
  SheetFooter 
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

const Opportunities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'deadline'>('recent');

  const { opportunities, isLoading, applyToOpportunity } = useOpportunities({
    searchQuery,
    categoryId: selectedCategory,
  });

  const { categories } = useCategories();

  const filteredOpportunities = opportunities.filter(opportunity => {
    if (showRemoteOnly && !opportunity.is_remote) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime();
  });

  const handleApply = async (opportunityId: string) => {
    await applyToOpportunity.mutateAsync(opportunityId);
  };

  const activeFiltersCount = [
    selectedCategory,
    showRemoteOnly,
  ].filter(Boolean).length;

  return (
    <DashboardLayout>
      <DashboardHeader title="Opportunities" />
      
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
            <p className="text-muted-foreground mt-1">
              Discover and apply to opportunities that match your interests
            </p>
          </div>
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Opportunities</SheetTitle>
                <SheetDescription>
                  Refine opportunities based on your preferences
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label>Sort By</Label>
                    <Select value={sortBy} onValueChange={(value: 'recent' | 'deadline') => setSortBy(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sorting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Work Type</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remote"
                        checked={showRemoteOnly}
                        onCheckedChange={(checked) => setShowRemoteOnly(checked as boolean)}
                      />
                      <Label htmlFor="remote">Remote opportunities only</Label>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" onClick={() => {
                    setSelectedCategory('');
                    setShowRemoteOnly(false);
                    setSortBy('recent');
                  }}>
                    Reset Filters
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities by title, company, or description..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="grid gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-6 rounded-lg border">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-[100px]" />
                    <Skeleton className="h-8 w-[100px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-background">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">No opportunities found</h3>
              <p className="text-muted-foreground max-w-[500px] mx-auto">
                {searchQuery 
                  ? "We couldn't find any opportunities matching your search criteria. Try adjusting your filters or search terms."
                  : "There are no opportunities available at the moment. Please check back later."}
              </p>
              {(activeFiltersCount > 0 || searchQuery) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setShowRemoteOnly(false);
                    setSortBy('recent');
                  }}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                id={opportunity.id}
                title={opportunity.title}
                organization={opportunity.organization}
                category={opportunity.category?.name || ''}
                categories={[opportunity.category?.name || '']}
                deadline={opportunity.expiry_date}
                description={opportunity.description}
                website_url={opportunity.application_url}
                onApply={() => handleApply(opportunity.id)}
                isRemote={opportunity.is_remote}
                location={opportunity.location}
                salary={opportunity.salary}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Opportunities;
