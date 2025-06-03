import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Shield, CheckCircle } from 'lucide-react';

const Settings = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('General');
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const tabs = ['General', 'Profile', 'Security', 'Billing and usage', 'Notifications', 'Refer a friend'];

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
      toast({
        variant: 'destructive',
        title: 'Update failed',
        description: 'Failed to update profile information.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Passwords do not match',
      });
      return;
    }
    
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      toast({
        title: 'Password updated successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Update failed',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General':
        return (
          <div className="space-y-6">
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  disabled 
                  className="mt-1 bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">Email address cannot be changed</p>
              </div>
              <Button type="submit" disabled={loading} className="w-fit">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Save Changes
              </Button>
            </form>
          </div>
        );

      case 'Profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Profile Information</h3>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="displayName" className="text-sm font-medium">Display Name</Label>
                  <Input 
                    id="displayName" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                  <textarea 
                    id="bio"
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-fit">
                  Update Profile
                </Button>
              </form>
            </div>
          </div>
        );

      case 'Security':
        return (
          <div className="space-y-6">
            {/* Security Score */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">90%</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Your account security is 90%</h3>
                  <p className="text-sm text-gray-600">Please review your account security settings regularly and update your password.</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Dismiss</Button>
                  <Button size="sm">Review security</Button>
                </div>
              </div>
            </div>

            {/* Basics Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Basics</h3>
              <div className="space-y-4">
                {/* Password */}
                <div className="flex items-center justify-between py-3 border-b">
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
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">Very secure</span>
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
                    <Shield className="w-6 h-6 text-orange-500" />
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
                    <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.024.041.051.080.051.080-.177.934-.545 3.623-.545 3.623-.051.402-.402.64-.402.64C4.422 18.963.029 14.776.029 11.987.029 5.367 5.396.001 12.017.001z"/>
                      </svg>
                    </div>
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

                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="font-medium">Brave on Mac OS X</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span>Mexico City, Mexico</span>
                        <span>1 month ago</span>
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

      case 'Billing and usage':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Billing Information</h3>
              <p className="text-gray-600">Manage your subscription and billing details.</p>
            </div>
          </div>
        );

      case 'Notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive email updates about new opportunities</p>
                  </div>
                  <Switch 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'Refer a friend':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Refer a Friend</h3>
              <p className="text-gray-600">Invite friends and earn rewards.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 mr-8">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === tab
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;