import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { useOpportunities } from '@/hooks/useOpportunities';
import { useCategories } from '@/hooks/useCategories';
import OpportunityFormDrawer from '@/components/admin/OpportunityFormDrawer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Opportunity } from '@/types/opportunity';

const AdminOpportunities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | undefined>(undefined);

  const { opportunities, isLoading, createOpportunity, updateOpportunity, deleteOpportunity } = useOpportunities({
    searchQuery,
  });

  const { categories } = useCategories();

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    await deleteOpportunity.mutateAsync(deleteId);
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setDrawerOpen(true);
  };

  const handleAddNew = () => {
    setEditingOpportunity(undefined);
    setDrawerOpen(true);
  };

  const handleSubmit = async (values: any) => {
    if (editingOpportunity) {
      await updateOpportunity.mutateAsync({ id: editingOpportunity.id, ...values });
    } else {
      await createOpportunity.mutateAsync(values);
    }
    setDrawerOpen(false);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Opportunities</h1>
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add Opportunity
          </Button>
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
        ) : opportunities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No opportunities found.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="flex items-center justify-between p-4 bg-card rounded-lg border"
              >
                <div>
                  <h3 className="font-medium">{opportunity.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {opportunity.organization} • {opportunity.category?.name}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(opportunity)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(opportunity.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
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

        <OpportunityFormDrawer
          open={drawerOpen}
          setOpen={setDrawerOpen}
          categories={categories}
          onSubmit={handleSubmit}
          loading={createOpportunity.isPending || updateOpportunity.isPending}
          initialValues={editingOpportunity}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminOpportunities;
