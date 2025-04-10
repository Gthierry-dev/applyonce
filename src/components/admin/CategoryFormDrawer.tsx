import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"

const categorySchema = z.object({
  title: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
  icon_name: z.string().default("folder"),
  color: z.string().default("#4F46E5"),
})

interface CategoryFormDrawerProps {
  children?: React.ReactNode
  className?: string
  category?: any
  open?: boolean
  setOpen?: (open: boolean) => void
  selectedCategory?: any
  onCreateSuccess?: (category: any) => void
  onUpdateSuccess?: (category: any) => void
}

export function CategoryFormDrawer({
  children,
  className,
  category,
  open,
  setOpen,
  selectedCategory,
  onCreateSuccess,
  onUpdateSuccess
}: CategoryFormDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use the provided open/setOpen if available, otherwise use local state
  const drawerOpen = open !== undefined ? open : isOpen;
  const setDrawerOpen = setOpen || setIsOpen;
  
  // Use either provided category or selectedCategory
  const categoryData = category || selectedCategory;

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: categoryData?.title || "",
      description: categoryData?.description || "",
      is_active: categoryData?.is_active || true,
      icon_name: categoryData?.icon_name || "folder",
      color: categoryData?.color || "#4F46E5",
    },
  })

  useEffect(() => {
    if (categoryData) {
      form.reset({
        title: categoryData.title || "",
        description: categoryData.description || "",
        is_active: categoryData.is_active || true,
        icon_name: categoryData.icon_name || "folder",
        color: categoryData.color || "#4F46E5",
      })
    }
  }, [categoryData, form])

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    setIsLoading(true)
    try {
      if (categoryData) {
        // Update existing category
        const { data, error } = await supabase
          .from("categories")
          .update({
            title: values.title,
            description: values.description,
            icon_name: values.icon_name,
            color: values.color
          })
          .eq("id", categoryData.id)
          .select()

        if (error) {
          console.error("Error updating category:", error)
          toast({
            variant: "destructive",
            title: "Error updating category",
            description: "Something went wrong. Please try again.",
          })
          return
        }

        toast({
          title: "Category updated successfully",
          description: `Category "${values.title}" has been updated.`,
        })
        
        if (onUpdateSuccess && data && data.length > 0) {
          onUpdateSuccess(data[0]);
        }
      } else {
        // Create new category
        const { data, error } = await supabase
          .from("categories")
          .insert({
            title: values.title,
            description: values.description,
            icon_name: values.icon_name,
            color: values.color
          })
          .select()

        if (error) {
          console.error("Error creating category:", error)
          toast({
            variant: "destructive",
            title: "Error creating category",
            description: "Something went wrong. Please try again.",
          })
          return
        }

        toast({
          title: "Category created successfully",
          description: `Category "${values.title}" has been created.`,
        })
        
        if (onCreateSuccess && data && data.length > 0) {
          onCreateSuccess(data[0]);
        }
      }
      form.reset()
      setDrawerOpen(false)
    } catch (error) {
      console.error("Category action error:", error)
      toast({
        variant: "destructive",
        title: "Category action error",
        description: "Failed to save category. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className={cn("sm:max-w-lg", className)}>
        <DrawerHeader>
          <DrawerTitle>
            {categoryData ? "Edit Category" : "Create New Category"}
          </DrawerTitle>
          <DrawerDescription>
            {categoryData
              ? "Make changes to your category here."
              : "Add a new category to the list."}
          </DrawerDescription>
        </DrawerHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name that will be displayed in the list.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Category description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a description for your category.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold leading-none">
                    Active Status
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable this category.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Separator />
            <DrawerFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {categoryData ? "Update Category" : "Create Category"}
              </Button>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

// Export as default for backward compatibility
export default CategoryFormDrawer;
