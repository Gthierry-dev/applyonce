
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Edit, Trash, ExternalLink } from 'lucide-react';
import OpportunityFormDrawer from '@/components/admin/OpportunityFormDrawer';

const opportunities = [
  { id: 1, title: 'Summer Research Fellowship', organization: 'Stanford University', category: 'Research', deadline: '2023-06-30', status: 'Active', url: 'https://stanford.edu/research' },
  { id: 2, title: 'Graduate Scholarship Program', organization: 'Harvard University', category: 'Scholarship', deadline: '2023-07-15', status: 'Active', url: 'https://harvard.edu/scholarships' },
  { id: 3, title: 'Tech Innovation Grant', organization: 'MIT', category: 'Grant', deadline: '2023-08-01', status: 'Active', url: 'https://mit.edu/grants' },
  { id: 4, title: 'International Exchange Program', organization: 'Yale University', category: 'Exchange', deadline: '2023-09-15', status: 'Draft', url: 'https://yale.edu/exchange' },
  { id: 5, title: 'Community Leadership Award', organization: 'Princeton University', category: 'Award', deadline: '2023-10-30', status: 'Active', url: 'https://princeton.edu/awards' },
];

const AdminOpportunities = () => {
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
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opportunity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.map((opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell>
                    <div className="font-medium">{opportunity.title}</div>
                    <div className="text-sm text-muted-foreground">{opportunity.organization}</div>
                  </TableCell>
                  <TableCell>{opportunity.category}</TableCell>
                  <TableCell>{opportunity.deadline}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      opportunity.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {opportunity.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                        <a href={opportunity.url} target="_blank" rel="noopener noreferrer" title="Visit official page">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOpportunities;
