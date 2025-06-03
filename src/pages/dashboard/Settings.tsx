import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, User, Shield, Bell, CreditCard, Users, CheckCircle } from 'lucide-react';
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const Settings = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('General');
  
  // Personal info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  
  // Security
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);

  const tabs = ['General', 'Profile', 'Security', 'Billing and Usage', 'Notifications', 'Refer a Friend'];

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
    }
    
    if (profile) {
      setFullName(profile.full_name || '');
    }
  }, [user, profile]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Update profile information
      const { error } = await supabase
        .from('profiles')
        .update({ 
          full_name: fullName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      
      toast({
        title: 'Profile updated',
        description: 'Your profile information has been updated successfully.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Update failed',
        description: 'Failed to update profile information. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Tab icon mapping
  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'General':
        return <User className="w-5 h-5" />;
      case 'Profile':
        return <User className="w-5 h-5" />;
      case 'Security':
        return <Shield className="w-5 h-5" />;
      case 'Billing and Usage':
        return <CreditCard className="w-5 h-5" />;
      case 'Notifications':
        return <Bell className="w-5 h-5" />;
      case 'Refer a Friend':
        return <Users className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Account Information</h3>
              <p className="text-sm text-gray-600 mb-4">Manage your account details and preferences</p>
              
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name" 
                    className="max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    disabled 
                    placeholder="Your email address" 
                    className="max-w-md"
                  />
                  <p className="text-sm text-muted-foreground">
                    Email address cannot be changed
                  </p>
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving
                    </>
                  ) : (
                    'Save changes'
                  )}
                </Button>
              </form>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
              <p className="text-sm text-gray-600 mb-4">Permanently delete your account and all of your content</p>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        );

      case 'Profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Profile Information</h3>
              <p className="text-sm text-gray-600 mb-4">Update your profile details</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full max-w-md h-24 px-3 py-2 text-sm rounded-md border border-input bg-background"
                    placeholder="Tell us about yourself"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="Your location" 
                    className="max-w-md"
                  />
                </div>
                
                <Button>
                  Save Profile
                </Button>
              </div>
            </div>
          </div>
        );

      case 'Security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Security Settings</h3>
              <p className="text-sm text-gray-600 mb-4">Manage your account security</p>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="font-medium">Your account security is 90%</h4>
                      <p className="text-sm text-gray-600">Please review your account security settings regularly and update your password.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm">Dismiss</Button>
                      <Button size="sm">Review security</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                {/* Password */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-gray-600">Set a password to protect your account.</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="w-1 h-1 bg-gray-800 rounded-full" />
                        ))}
                      </div>
                      <CheckCircle className="w-4 h-4 text-main_color" />
                      <span className="text-sm text-main_color font-medium">Very secure</span>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                {/* Two-step verification */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium">Two-step verification</h4>
                    <p className="text-sm text-gray-600">We recommend requiring a verification code in addition to your password.</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Switch 
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                    <span className="text-sm font-medium">Two-step verification</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Browsers and devices */}
            <div>
              <h3 className="text-lg font-medium mb-2">Browsers and devices</h3>
              <p className="text-sm text-gray-600 mb-4">These browsers and devices are currently signed in to your account. Remove any unauthorized devices.</p>
              
              <div className="space-y-3">
                {/* Current sessions */}
                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-main_color" />
                    <div>
                      <p className="font-medium">Brave on Mac OS X</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span>Ninh Binh, Vietnam</span>
                        <span>Current session</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-main_color" />
                    <div>
                      <p className="font-medium">Clive's MacBook Pro</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span>Ninh Binh, Vietnam</span>
                        <span>Current session</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Billing and Usage':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Billing Information</h3>
              <p className="text-sm text-gray-600 mb-4">Manage your subscription and billing details</p>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Free Plan</h4>
                      <p className="text-sm text-gray-600">You are currently on the free plan</p>
                    </div>
                    <Button>Upgrade Plan</Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                <h4 className="font-medium">Payment Methods</h4>
                <p className="text-sm text-gray-600">No payment methods added yet</p>
                <Button variant="outline">Add Payment Method</Button>
              </div>
            </div>
          </div>
        );

      case 'Notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              <p className="text-sm text-gray-600 mb-4">Manage how you receive notifications</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive email updates about new opportunities</p>
                  </div>
                  <Switch 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium">Application Updates</h4>
                    <p className="text-sm text-gray-600">Receive notifications when your application status changes</p>
                  </div>
                  <Switch 
                    checked={appNotifications}
                    onCheckedChange={setAppNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium">Marketing Emails</h4>
                    <p className="text-sm text-gray-600">Receive emails about new features and promotions</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        );

      case 'Refer a Friend':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Refer a Friend</h3>
              <p className="text-sm text-gray-600 mb-4">Invite friends to ApplyOnce and earn rewards</p>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h4 className="font-medium text-xl">Share your referral link</h4>
                    <p className="text-sm text-gray-600">For each friend who signs up, you'll both receive benefits</p>
                    
                    <div className="flex max-w-md mx-auto">
                      <Input 
                        value="https://applyonce.com/ref/yourcode" 
                        readOnly 
                        className="rounded-r-none"
                      />
                      <Button className="rounded-l-none">Copy</Button>
                    </div>
                    
                    <div className="pt-4">
                      <p className="text-sm font-medium mb-2">Or share via</p>
                      <div className="flex justify-center space-x-4">
                        <Button variant="outline" size="sm">Email</Button>
                        <Button variant="outline" size="sm">Twitter</Button>
                        <Button variant="outline" size="sm">Facebook</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div>
                <h4 className="font-medium mb-2">Your Referrals</h4>
                <p className="text-sm text-gray-600">You haven't referred anyone yet</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Settings" />
      <div className="max-w-6xl  mx-auto">
        <div className="mb-6">
          {/* <h1 className="text-2xl font-bold tracking-tight">Settings</h1> */}
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <nav className="space-y-1 sticky top-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full flex items-center text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === tab
                      ? 'bg-main_color/10 text-main_color font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{getTabIcon(tab)}</span>
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;