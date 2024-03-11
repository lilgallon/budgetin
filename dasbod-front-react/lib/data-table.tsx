import * as React from "react"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Column } from "@tanstack/table-core"

import { Button } from "@/components/ui/button"

export function moneyCell(
  value: string,
  className: string = "",
  dynamicColor: "no" | "yes" | "yes-invert" = "no"
) {
  const amount = parseFloat(value)

  // Format the amount as a dollar amount
  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount)

  switch (dynamicColor) {
    case "yes":
      className += amount > 0 ? " text-green-400" : " text-red-400"
      break
    case "yes-invert":
      className += amount > 0 ? " text-red-400" : " text-green-400"
      break
  }

  return <div className={"font-medium" + className}>{formatted}</div>
}

export function sortableColumn<T>(
  label: string,
  column: Column<T>,
  className: string = ""
) {
  return (
    <div className={className}>
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {label}
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
