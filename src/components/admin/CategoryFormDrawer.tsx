import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Loader2 } from "lucide-react"

const categorySchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
})

interface CategoryFormDrawerProps {
  children?: React.ReactNode
  className?: string
  category?: any
}

export function CategoryFormDrawer({
  children,
  className,
  category,
}: CategoryFormDrawerProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      is_active: category?.is_active || true,
    },
  })

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name || "",
        description: category.description || "",
        is_active: category.is_active || true,
      })
    }
  }, [category, form])

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    setIsLoading(true)
    try {
      if (category) {
        // Update existing category
        const { data, error } = await supabase
          .from("categories")
          .update(values)
          .eq("id", category.id)
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
          description: `Category "${values.name}" has been updated.`,
        })
      } else {
        // Create new category
        const { data, error } = await supabase
          .from("categories")
          .insert([values])
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
          description: `Category "${values.name}" has been created.`,
        })
      }
      form.reset()
      setOpen(false)
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className={cn("sm:max-w-lg", className)}>
        <DrawerHeader>
          <DrawerTitle>
            {category ? "Edit Category" : "Create New Category"}
          </DrawerTitle>
          <DrawerDescription>
            {category
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
                name="name"
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
                {category ? "Update Category" : "Create Category"}
              </Button>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
