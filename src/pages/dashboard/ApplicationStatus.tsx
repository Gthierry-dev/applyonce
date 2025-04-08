
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { useApplications } from '@/hooks/useApplications';

const ApplicationStatus = () => {
  const { applications, isLoading } = useApplications();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="mr-1 h-3.5 w-3.5" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <XCircle className="mr-1 h-3.5 w-3.5" />
            Rejected
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <AlertCircle className="mr-1 h-3.5 w-3.5" />
            Pending
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Clock className="mr-1 h-3.5 w-3.5" />
            Draft
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Unknown
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Application Status</h1>
          <p className="text-muted-foreground">
            Check the status of your submitted applications.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : applications.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Application Status Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">{app.title}</div>
                          <div className="text-sm text-muted-foreground">{app.organization}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(app.submitted_date)}</TableCell>
                      <TableCell>{formatDate(app.last_updated)}</TableCell>
                      <TableCell>
                        {getStatusBadge(app.status)}
                        <p className="text-xs mt-1 text-muted-foreground max-w-[250px]">
                          {app.notes}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="bg-card text-card-foreground rounded-lg border shadow p-6">
            <p className="text-center py-8 text-muted-foreground">
              You haven't submitted any applications yet.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApplicationStatus;
