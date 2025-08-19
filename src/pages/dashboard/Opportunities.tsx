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
import OpportunitiesPage from '@/components/dashboard/OpportunitiesPage';

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
    <DashboardLayout >
      <DashboardHeader title="Opportunities" />
      <OpportunitiesPage/>
    </DashboardLayout>
  );
};

export default Opportunities;
