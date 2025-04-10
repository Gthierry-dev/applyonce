
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OpportunityCard from '@/components/cards/OpportunityCard';
import { Button } from '@/components/ui/button';
import { supabase, Opportunity, Category } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
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

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchOpportunities();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('title', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('is_active', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOpportunities(data || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      toast({
        title: 'Error',
        description: 'Failed to load opportunities',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('opportunities')
        .select('*')
        .eq('is_active', true);
      
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }
      
      if (showFeaturedOnly) {
        query = query.eq('featured', true);
      }
      
      const { data, error } = await query
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOpportunities(data || []);
    } catch (error) {
      console.error('Error filtering opportunities:', error);
      toast({
        title: 'Error',
        description: 'Failed to filter opportunities',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setShowFeaturedOnly(false);
    fetchOpportunities();
  };

  const filteredOpportunities = opportunities.filter(opp => 
    opp.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof opp.category === 'string' && opp.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
            <p className="text-muted-foreground">
              Discover and apply for internships, jobs, scholarships, and more
            </p>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Opportunities</SheetTitle>
                <SheetDescription>
                  Narrow down opportunities based on your preferences
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.title}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="featured"
                    checked={showFeaturedOnly}
                    onCheckedChange={(checked) => 
                      setShowFeaturedOnly(checked as boolean)
                    }
                  />
                  <Label htmlFor="featured">Featured opportunities only</Label>
                </div>
              </div>
              
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" onClick={resetFilters}>Reset</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button onClick={handleFilter}>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
            className="pl-8 mb-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <p>Loading opportunities...</p>
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No opportunities available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard 
                key={opportunity.id}
                id={opportunity.id}
                title={opportunity.title}
                organization={opportunity.organization}
                category={opportunity.category}
                categories={opportunity.categories as string[] | undefined}
                deadline={new Date(opportunity.deadline).toISOString()}
                description={opportunity.description}
                website_url={opportunity.website_url}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Opportunities;
