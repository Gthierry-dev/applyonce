import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { UserPlus, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Define the form schema with Zod
const formSchema = z.object({
  full_name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  role: z.enum(['user', 'admin'], { required_error: 'Please select a role' }),
});

type FormValues = z.infer<typeof formSchema>;

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

interface UserFormDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  isEditing?: boolean;
  initialData?: Profile & { email?: string };
  onSuccess?: () => void;
}

const UserFormDrawer = ({ 
  isOpen = false, 
  onClose = () => {}, 
  isEditing = false,
  initialData,
  onSuccess
}: UserFormDrawerProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(isOpen);
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: initialData?.full_name || '',
      email: initialData?.email || '',
      role: (initialData?.role as 'user' | 'admin') || 'user',
    },
  });
  
  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        full_name: initialData.full_name,
        email: initialData.email || '',
        role: initialData.role as 'user' | 'admin',
      });
    }
  }, [initialData, form]);
  
  // Update open state when isOpen prop changes
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) onClose();
  };

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: data.email,
        email_confirm: true,
        user_metadata: { full_name: data.full_name },
      });
      
      if (authError) throw authError;
      
      // Then create the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: data.full_name,
          role: data.role,
        });
      
      if (profileError) throw profileError;
      
      return authData.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Success',
        description: 'User created successfully',
      });
      handleOpenChange(false);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to create user: ${error.message}`,
      });
    }
  });
  
  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!initialData) throw new Error('No user to update');
      
      // Update the profile
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          role: data.role,
        })
        .eq('id', initialData.id);
      
      if (error) throw error;
      
      return { id: initialData.id, ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Success',
        description: 'User updated successfully',
      });
      handleOpenChange(false);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to update user: ${error.message}`,
      });
    }
  });

  const onSubmit = (data: FormValues) => {
    if (isEditing && initialData) {
      updateUserMutation.mutate(data);
    } else {
      createUserMutation.mutate(data);
    }
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

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input 
                  id="full_name"
                  {...form.register('full_name')}
                  className="mt-1"
                />
                {form.formState.errors.full_name && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.full_name.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  {...form.register('email')}
                  className="mt-1"
                  disabled={isEditing} // Email can't be changed after creation
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <Select 
                  onValueChange={(value) => form.setValue('role', value as 'user' | 'admin')}
                  defaultValue={form.getValues('role')}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.role && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.role.message}</p>
                )}
              </div>
            </div>

            <SheetFooter className="pt-4">
              <SheetClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </SheetClose>
              <Button 
                type="submit" 
                disabled={createUserMutation.isPending || updateUserMutation.isPending}
              >
                {(createUserMutation.isPending || updateUserMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEditing ? 'Update' : 'Create'}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UserFormDrawer;
