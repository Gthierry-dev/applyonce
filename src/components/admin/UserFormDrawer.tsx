
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserPlus } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  applications: number;
}

interface UserFormDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  isEditing?: boolean;
  initialData?: User;
}

const UserFormDrawer = ({ 
  isOpen = false, 
  onClose = () => {}, 
  isEditing = false,
  initialData
}: UserFormDrawerProps) => {
  const [open, setOpen] = React.useState(isOpen);
  
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission
    console.log('Form submitted');
    handleOpenChange(false);
  };

  return (
    <>
      {!isEditing && (
        <Button className="flex items-center gap-2" onClick={() => setOpen(true)}>
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      )}

      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{isEditing ? 'Update User' : 'Add User'}</SheetTitle>
            <SheetDescription>
              {isEditing 
                ? 'Update user information in the system.' 
                : 'Add a new user to the system.'}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  defaultValue={initialData?.name || ''}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  defaultValue={initialData?.email || ''}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <Select defaultValue={initialData?.role || 'User'}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={initialData?.status || 'Active'}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <SheetFooter className="pt-4">
              <SheetClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </SheetClose>
              <Button type="submit">{isEditing ? 'Update' : 'Create'}</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UserFormDrawer;
