"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  chartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Assuming you're using a Select component

export function MultiLine({ transactions }) {
  const [timePeriod, setTimePeriod] = useState("month"); // Default view is month-wise

  // Prepare the chart data based on the transactions
  const chartData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.transactionTime);
    let timeKey;

    if (timePeriod === "month") {
      timeKey = date.toLocaleString("default", { month: "long" });
    } else if (timePeriod === "year") {
      timeKey = date.getFullYear();
    } else if (timePeriod === "day") {
      timeKey = date.toLocaleDateString();
    }

    const amount = transaction.amount;
    const existingTimePeriod = acc.find((item) => item.timeKey === timeKey);

    if (existingTimePeriod) {
      // If the time period exists, update income or expense
      if (transaction.transactionType === "income") {
        existingTimePeriod.income += amount;
      } else {
        existingTimePeriod.expense += amount;
      }
    } else {
      // If it doesn't exist, create a new entry
      acc.push({
        timeKey,
        income: transaction.transactionType === "income" ? amount : 0,
        expense: transaction.transactionType === "expense" ? amount : 0,
      });
    }
    return acc;
  }, []);

  // Sort the chartData
  if (timePeriod === "month") {
    const monthOrder = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    chartData.sort((a, b) => monthOrder.indexOf(a.timeKey) - monthOrder.indexOf(b.timeKey));
  } else if (timePeriod === "year") {
    chartData.sort((a, b) => a.timeKey - b.timeKey);
  } else if (timePeriod === "day") {
    chartData.sort((a, b) => new Date(a.timeKey) - new Date(b.timeKey));
  }

  const chartConfig = {
    income: {
      label: "Income",
      color: "hsl(var(--chart-1))",
    },
    expense: {
      label: "Expense",
      color: "hsl(var(--chart-4))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Income vs. Expense</CardTitle>
        <CardDescription>Select time period to filter</CardDescription>
      </CardHeader>

      {/* Dropdown for selecting time period */}
      <CardContent>
        <Select onValueChange={(value) => setTimePeriod(value)} defaultValue="month">
          <SelectTrigger>
            <SelectValue placeholder="Select Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
            <SelectItem value="day">Day</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>

      {/* Line chart rendering */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timeKey"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0} // Ensures all periods are displayed
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} className="bg-white"/>
            <Line dataKey="income" type="monotone" stroke={chartConfig.income.color} strokeWidth={2} dot={false} />
            <Line dataKey="expense" type="monotone" stroke={chartConfig.expense.color} strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing income and expense data for the selected time period
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
