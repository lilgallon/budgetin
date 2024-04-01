import React from "react"

import { Reference } from "@/lib/data/common"
import { BudgetCategoriesTable } from "@/components/business/budget/budget-categories-table"
import { BudgetTransactionsTable } from "@/components/business/budget/budget-transactions-table"
import { BudgetCategoryDialog } from "@/components/business/budget/dialog/budget-category-dialog"

export type BudgetPlanContentProps = {
  budgetPlanRef: Reference
}

export function BudgetPlanContent(props: BudgetPlanContentProps) {
  return (
    <>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Categories
      </h2>
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <BudgetCategoryDialog
          budgetPlanRef={props.budgetPlanRef}
        ></BudgetCategoryDialog>
      </div>
      <BudgetCategoriesTable></BudgetCategoriesTable>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Transactions
      </h2>
      <BudgetTransactionsTable></BudgetTransactionsTable>
    </>
  )
}
