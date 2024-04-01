import { z } from "zod"

import { budgetTransactionStatuses } from "@/lib/data/budget/budget-entities"

export const budgetCategoryFormSchema = z.object({
  id: z.nullable(z.string()),
  name: z.string().min(1, {
    message: "Name cannot be empty",
  }),
  amount: z.coerce.number().min(0, {
    message: "Amount must be greater than 0",
  }),
  budgetPlanRef: z.object({
    id: z.string(),
    type: z.string(),
  }),
})

export const budgetPlanFormSchema = z.object({
  id: z.nullable(z.string()),
  amountAtStart: z.coerce.number().min(0, {
    message: "Amount at start must be greater than 0",
  }),
  expectedIncome: z.coerce.number().min(0, {
    message: "Expected income must be greater than 0",
  }),
  startDate: z.date(),
  endDate: z.date(),
})

export const budgetTransactionFormSchema = z.object({
  id: z.nullable(z.string()),
  date: z.date(),
  categoryRef: z.object({
    id: z.string(),
    type: z.string(),
  }),
  amount: z.coerce.number().min(0, {
    message: "Amount must be greater than 0",
  }),
  description: z.string(),
  status: z.enum(budgetTransactionStatuses),
})
