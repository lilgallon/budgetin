"use client"

import * as React from "react"
import { useEffect } from "react"
import {
  CaretDownIcon,
  CheckCircledIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  InfoCircledIcon,
  Pencil1Icon,
  ResetIcon,
  TrashIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { moneyCell, sortableColumn } from "@/lib/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Payment = {
  id: string
  amount: number
  category: Category
  description: string
  date: Date
  status: Status
}

const categories = ["pending", "processing", "success", "failed"] as const
export type Category = (typeof categories)[number]
type Status = "paid" | "processing"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    category: "success",
    description: "ken99@yahoo.com",
    date: new Date(),
    status: "paid",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    category: "success",
    description: "Abe45@gmail.com",
    date: new Date(),
    status: "paid",
  },
  {
    id: "derv1ws0",
    amount: 837,
    category: "processing",
    description: "Monserrat44@gmail.com",
    date: new Date(),
    status: "paid",
  },
  {
    id: "5kma53ae",
    amount: 874,
    category: "success",
    description: "Silas22@gmail.com",
    date: new Date(),
    status: "processing",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    category: "failed",
    description: "carmella@hotmail.com",
    date: new Date(),
    status: "processing",
  },
]

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => sortableColumn("Status", column),
    cell: ({ row }) => {
      const status = row.getValue("status")

      if (status == "paid") {
        return (
          <Badge className="bg-green-400">
            <CheckCircledIcon className="mr-1"></CheckCircledIcon> Paid
          </Badge>
        )
      } else if (status == "processing") {
        return (
          <Badge className="bg-orange-400">
            <InfoCircledIcon className="mr-1"></InfoCircledIcon> Processing
          </Badge>
        )
      } else {
        return <Badge>Unknown</Badge>
      }
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => sortableColumn("Date", column),
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue("date") as Date).toDateString()}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => sortableColumn("Category", column),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => sortableColumn("Description", column),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => sortableColumn("Amount", column, "text-right"),
    cell: ({ row }) => moneyCell(row.getValue("amount"), "text-right"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      let statusAction = <></>
      switch (payment.status) {
        case "paid":
          statusAction = (
            <>
              <InfoCircledIcon className="mr-1"></InfoCircledIcon> Processing
            </>
          )
          break
        case "processing":
          statusAction = (
            <>
              <CheckCircledIcon className="mr-1"></CheckCircledIcon> Paid
            </>
          )
          break
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              {statusAction}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Pencil1Icon className="mr-1"></Pencil1Icon> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <TrashIcon className="mr-1"></TrashIcon> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function TransactionsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [rowsSelected, setRowsSelected] = React.useState<Payment[]>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  useEffect(() => {
    setRowsSelected(Object.keys(rowSelection).map((key) => data[parseInt(key)]))
  }, [rowSelection])

  const resetFilters = () => {
    table.getColumn("description")?.setFilterValue(undefined)
    table.getColumn("category")?.setFilterValue(undefined)
  }

  const markSelectedAsPaid = () => {
    // TODO
  }

  const markSelectAsProcessing = () => {
    // TODO
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={rowsSelected.length === 0}>
              Actions <CaretDownIcon className="ml-1"></CaretDownIcon>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-25" align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={markSelectedAsPaid}>
              <CheckCircledIcon className="mr-1"></CheckCircledIcon> Processing
            </DropdownMenuItem>
            <DropdownMenuItem onClick={markSelectAsProcessing}>
              <InfoCircledIcon className="mr-1"></InfoCircledIcon> Paid
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Pencil1Icon className="mr-1"></Pencil1Icon> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <TrashIcon className="mr-1"></TrashIcon> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          placeholder="Filter descriptions..."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-5"
        />
        <Select
          value={
            (table.getColumn("category")?.getFilterValue() as string) ?? ""
          }
          onValueChange={(value) =>
            table.getColumn("category")?.setFilterValue(value)
          }
        >
          <SelectTrigger className="w-[180px] ml-5 capitalize">
            <SelectValue placeholder="Filter a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((category) => {
                return (
                  <SelectItem
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button variant="outline" className="ml-5" onClick={resetFilters}>
          <ResetIcon className="mr-1"></ResetIcon> Reset filters
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
