"use client"

import React from "react"

import { CategoriesTable } from "@/components/business/budget/categories-table"
import { TransactionsTable } from "@/components/business/budget/transactions-table"





export default function BudgetPage() {
  return (
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                  Budget
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground">wip</p>
          </div>

          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Categories
          </h2>

          <CategoriesTable></CategoriesTable>

          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Transactions
          </h2>
          <TransactionsTable></TransactionsTable>
      </section>
  )
}
