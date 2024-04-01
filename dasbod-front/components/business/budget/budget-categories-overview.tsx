import React from "react"
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    name: "Jan",
    spent: 500,
    remaining: 100,
  },
  {
    name: "Feb",
    spent: 38,
    remaining: 468,
  },
]

export function BudgetCategoriesOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        width={500}
        height={300}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend></Legend>
        <Bar
          dataKey="spent"
          // fill="currentColor"
          // radius={[4, 4, 0, 0]}
          // className="fill-primary"
          fill="#82ca9d"
          stackId="a"
        />
        <Bar
          dataKey="remaining"
          // fill="currentColor"
          // radius={[4, 4, 0, 0]}
          // className="fill-primary-foreground"
          fill="#8884d8"
          stackId="a"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
