
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Bell, 
  Shield, 
  Briefcase, 
  Trash2, 
  Upload, 
  LogOut
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification preferences have been updated."
    });
  };

  const handleUploadPhoto = () => {
    toast({
      title: "Profile photo updated",
      description: "Your profile photo has been changed successfully."
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details and how we can reach you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="font-medium">Profile Photo</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleUploadPhoto}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="New York, USA" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full min-h-[100px] rounded-md border border-input p-3 text-sm"
                    placeholder="Tell us a little about yourself"
                    defaultValue="Product designer and developer based in New York."
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control when and how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { id: "newOpp", label: "New Opportunities" },
                      { id: "appUpdates", label: "Application Updates" },
                      { id: "deadlines", label: "Upcoming Deadlines" },
                      { id: "marketing", label: "Marketing and Newsletters" }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                        <Switch id={item.id} defaultChecked={item.id !== "marketing"} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">In-App Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { id: "appMessages", label: "Application Messages" },
                      { id: "statusChanges", label: "Status Changes" },
                      { id: "reminders", label: "Reminders" }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                        <Switch id={item.id} defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your privacy and data settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Privacy Controls</h3>
                  <div className="space-y-3">
                    {[
                      { id: "profileVisibility", label: "Make profile visible to recruiters" },
                      { id: "activityTracking", label: "Allow activity tracking for better recommendations" },
                      { id: "dataCollection", label: "Allow data collection for service improvement" }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                        <Switch id={item.id} defaultChecked={item.id === "profileVisibility"} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Data Management</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                      Delete All My Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>
                  Manage your account settings and login information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Password</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="mt-2">Update Password</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Linked Accounts</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#4285F4] rounded-full flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.845 8.2C15.845 7.67 15.8 7.15 15.715 6.645H8.09997V9.64H12.43C12.235 10.63 11.665 11.47 10.845 12.02V14.02H13.455C14.965 12.64 15.845 10.6 15.845 8.2Z" fill="white"/>
                            <path d="M8.09997 16C10.275 16 12.11 15.28 13.46 14.02L10.85 12.02C10.125 12.515 9.205 12.8 8.1 12.8C5.995 12.8 4.20997 11.39 3.57497 9.5H0.895972V11.55C2.23997 14.19 4.98997 16 8.09997 16Z" fill="white"/>
                            <path d="M3.57499 9.5C3.41499 9.03 3.32499 8.52 3.32499 8C3.32499 7.48 3.41999 6.98 3.56999 6.5V4.45H0.895996C0.325996 5.54 0 6.74 0 8C0 9.26 0.324996 10.46 0.895996 11.55L3.57499 9.5Z" fill="white"/>
                            <path d="M8.09997 3.2C9.29997 3.2 10.375 3.635 11.215 4.45L13.5 2.125C12.11 0.81 10.275 0 8.09997 0C4.98997 0 2.23997 1.81 0.895972 4.45L3.56997 6.5C4.20997 4.61 5.99497 3.2 8.09997 3.2Z" fill="white"/>
                          </svg>
                        </div>
                        <span className="font-medium">Google</span>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.6645 12.6668H10.6656V9.24683C10.6656 8.4268 10.6487 7.38013 9.51925 7.38013C8.37391 7.38013 8.19675 8.27347 8.19675 9.2001V12.6668H6.19787V5.5668H8.11779V6.4868H8.14654C8.43383 5.9601 9.10716 5.40013 10.11 5.40013C12.1354 5.40013 12.6667 6.8668 12.6667 8.7468V12.6668H12.6645Z" fill="white"/>
                            <path d="M3.3135 4.64681C2.59881 4.64681 2.02441 4.06681 2.02441 3.35681C2.02441 2.64681 2.60103 2.06681 3.3135 2.06681C4.02375 2.06681 4.60258 2.64681 4.60258 3.35681C4.60258 4.06681 4.02153 4.64681 3.3135 4.64681Z" fill="white"/>
                            <path d="M4.31475 12.6668H2.3125V5.5668H4.31475V12.6668Z" fill="white"/>
                          </svg>
                        </div>
                        <span className="font-medium">LinkedIn</span>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Account Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out of All Devices
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
