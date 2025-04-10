import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OpportunityCard from '@/components/cards/OpportunityCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
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

const Opportunities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

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
  });

  const handleApply = async (opportunityId: string) => {
    await applyToOpportunity.mutateAsync(opportunityId);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Opportunities</h1>
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Opportunities</SheetTitle>
                <SheetDescription>
                  Filter opportunities by category and work type.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
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
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={showRemoteOnly}
                    onCheckedChange={(checked) => setShowRemoteOnly(checked as boolean)}
                  />
                  <Label htmlFor="remote">Remote only</Label>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <p>Loading opportunities...</p>
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No opportunities found.</p>
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
