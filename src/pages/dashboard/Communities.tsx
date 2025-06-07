import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
// import CommunityFeed from '@/components/community/CommunityFeed';

const Communities = () => {
  return (
    <DashboardLayout>
      <DashboardHeader title="Communities" />
      {/* <CommunityFeed /> */}
    </DashboardLayout>
  );
};

export default Communities;