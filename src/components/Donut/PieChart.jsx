"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const description = "A donut chart with text";

// Define colors for income and expense categories using HSL
const categoryColors = {
  income: {
    Salary: "hsl(var(--chart-1))",
    Investment: "hsl(var(--chart-2))",
    Freelance: "hsl(var(--chart-3))",
    Other: "hsl(var(--chart-4))",
  },
  expense: {
    Food: "hsl(var(--chart-1))",
    Rent: "hsl(var(--chart-2))",
    Travel: "hsl(var(--chart-3))",
    Utilities: "hsl(var(--chart-4))",
    Other: "hsl(var(--chart-5))",
  },
};

// Dummy data for demonstration purposes
const incomeCategories = ['Salary', 'Investment', 'Freelance', 'Other'];
const expenseCategories = ['Food', 'Rent', 'Travel', 'Utilities', 'Other'];

export function Donut({ transactions }) {
  const [mounted, setMounted] = React.useState(false);
  const [transactionType, setTransactionType] = React.useState("income");
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const categorizedData = transactionType === "income" ? incomeCategories : expenseCategories;
    
    // Initialize chartData based on the selected transaction type
    const data = categorizedData.map((category) => {
      const total = transactions.reduce((acc, transaction) => {
        if (transaction.transactionType === transactionType && transaction.category === category) {
          return acc + transaction.amount;
        }
        return acc;
      }, 0);
      return { name: category, value: total, fill: categoryColors[transactionType][category] };
    }).filter((item) => item.value > 0);

    setChartData(data);
  }, [transactionType, transactions]);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  if (!mounted) {
    return null;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {/* Dropdown for selecting transaction type */}
        <Select onValueChange={(value) => setTransactionType(value)} defaultValue="income">
          <SelectTrigger>
            <SelectValue placeholder="Select Transaction Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expenses</SelectItem>
          </SelectContent>
        </Select>

        <ChartContainer
          config={{}} // Pass any chart configuration if needed
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              className="bg-white"
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total {transactionType === "income" ? "income" : "expenses"} for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
