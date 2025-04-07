
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Edit, Trash, ExternalLink } from 'lucide-react';
import OpportunityFormDrawer from '@/components/admin/OpportunityFormDrawer';
import { supabase, Opportunity } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const AdminOpportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
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

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('opportunities')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setOpportunities(opportunities.filter(opp => opp.id !== deleteId));
      toast({
        title: 'Success',
        description: 'Opportunity deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete opportunity',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const filteredOpportunities = opportunities.filter(opp => 
    opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Manage Opportunities</h1>
          <OpportunityFormDrawer />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search opportunities..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <p>Loading opportunities...</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Opportunity</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOpportunities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No opportunities found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOpportunities.map((opportunity) => (
                    <TableRow key={opportunity.id}>
                      <TableCell>
                        <div className="font-medium">{opportunity.title}</div>
                        <div className="text-sm text-muted-foreground">{opportunity.organization}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.categories && Array.isArray(opportunity.categories) ? (
                            opportunity.categories.map((cat, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {cat}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              {opportunity.category}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(opportunity.deadline).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          opportunity.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {opportunity.is_active ? 'Active' : 'Draft'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {opportunity.website_url && (
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                              <a href={opportunity.website_url} target="_blank" rel="noopener noreferrer" title="Visit official page">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleDeleteClick(opportunity.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Opportunity</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this opportunity? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminOpportunities;
