import * as React from "react"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Column } from "@tanstack/table-core"

import { Button } from "@/components/ui/button"





export function moneyCell(value: string, className: string = "") {
    const amount = parseFloat(value)

    // Format the amount as a dollar amount
    const formatted = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
    }).format(amount)

    return (<div className={"font-medium " + className}>{formatted}</div>)
}

export function sortableColumn<T>(label: string, column: Column<T>, className: string = "") {
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
