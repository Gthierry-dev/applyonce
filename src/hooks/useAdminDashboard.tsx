import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalUsers: number;
  totalApplications: number;
  totalCategories: number;
  totalOpportunities: number;
  recentActivities: Array<{
    type: 'opportunity' | 'category' | 'user';
    title: string;
    timestamp: string;
  }>;
  popularOpportunities: Array<{
    title: string;
    applicationCount: number;
  }>;
}

export const useAdminDashboard = () => {
  return useQuery<DashboardStats>({
    queryKey: ['adminDashboard'],
    queryFn: async () => {
      // Fetch total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch total applications
      const { count: totalApplications } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true });

      // Fetch total categories
      const { count: totalCategories } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true });

      // Fetch total opportunities
      const { count: totalOpportunities } = await supabase
        .from('opportunities')
        .select('*', { count: 'exact', head: true });

      // Fetch recent activities
      const recentActivities = [];
      
      // Get recent opportunities
      const { data: recentOpportunities } = await supabase
        .from('opportunities')
        .select('title, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (recentOpportunities) {
        recentOpportunities.forEach(opp => {
          recentActivities.push({
            type: 'opportunity',
            title: `New opportunity added: ${opp.title}`,
            timestamp: opp.created_at
          });
        });
      }

      // Get recent users
      const { data: recentUsers } = await supabase
        .from('profiles')
        .select('full_name, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (recentUsers) {
        recentUsers.forEach(user => {
          recentActivities.push({
            type: 'user',
            title: `New user registered: ${user.full_name || 'Anonymous'}`,
            timestamp: user.created_at
          });
        });
      }

      // Sort activities by timestamp
      recentActivities.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      // Fetch popular opportunities
      const { data: popularOpportunities } = await supabase
        .from('opportunities')
        .select(`
          title,
          applications:applications(count)
        `)
        .order('applications', { ascending: false })
        .limit(4);

      const formattedPopularOpportunities = popularOpportunities?.map(opp => ({
        title: opp.title,
        applicationCount: (opp.applications as any)?.length || 0
      })) || [];

      return {
        totalUsers: totalUsers || 0,
        totalApplications: totalApplications || 0,
        totalCategories: totalCategories || 0,
        totalOpportunities: totalOpportunities || 0,
        recentActivities: recentActivities.slice(0, 3),
        popularOpportunities: formattedPopularOpportunities
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}; 