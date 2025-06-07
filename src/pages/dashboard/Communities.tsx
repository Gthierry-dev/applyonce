import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CommunityFeed from '@/components/dashboard/CommunityFeed';

const Communities = () => {
  return (
    <DashboardLayout>
      <DashboardHeader title="Community" />
      <CommunityFeed />/
    </DashboardLayout>
  );
};

export default Communities;