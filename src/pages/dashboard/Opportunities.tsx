
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OpportunityCard from '@/components/cards/OpportunityCard';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOpportunities();
  }, []);

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
          <Button>Filter Opportunities</Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <p>Loading opportunities...</p>
          </div>
        ) : opportunities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No opportunities available at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {opportunities.map((opportunity) => (
              <OpportunityCard 
                key={opportunity.id}
                id={opportunity.id}
                title={opportunity.title}
                organization={opportunity.organization}
                category={opportunity.category}
                deadline={new Date(opportunity.deadline).toISOString()}
                description={opportunity.description}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Opportunities;
