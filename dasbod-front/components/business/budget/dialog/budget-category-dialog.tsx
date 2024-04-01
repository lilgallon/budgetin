import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { budgetCategoryFormSchema } from "@/lib/data/budget/budget-forms"
import { Reference } from "@/lib/data/common"
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

export type CategoryDialogProps = {
  id: string
  budgetPlanRef: Reference
}

export function BudgetCategoryDialog(props: CategoryDialogProps) {
  const form = useForm<z.infer<typeof budgetCategoryFormSchema>>({
    resolver: zodResolver(budgetCategoryFormSchema),
    defaultValues: {
      id: props.id,
      name: "",
      amount: 0,
      budgetPlanRef: props.budgetPlanRef,
    },
  })

  function onSubmit(values: z.infer<typeof budgetCategoryFormSchema>) {
    // TODO
    console.log(values, props.budgetPlanRef)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
          <DialogDescription>
            Add a new category for your transactions
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="🏠 Rent" {...field} />
                  </FormControl>
                  <FormDescription>The name of your category.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1300" {...field} />
                  </FormControl>
                  <FormDescription>
                    The amount to spend in this category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create category</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
