"use client"; // Ensures this component runs on the client side

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

export function Component({ transactions }) {
  const [timePeriod, setTimePeriod] = useState("month");

  // Aggregate and prepare chart data based on the selected time period
  const chartData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.transactionTime);
    let timeKey;

    // Determine the time key based on the selected period
    if (timePeriod === "month") {
      timeKey = date.toLocaleString("default", { month: "long" });
    } else if (timePeriod === "year") {
      timeKey = date.getFullYear();
    } else if (timePeriod === "day") {
      timeKey = date.toLocaleDateString();
    } else {
      return acc; // If an invalid time period is passed, skip this transaction
    }

    const amount = transaction.amount || 0; // Default to 0 if amount is undefined
    const type = transaction.transactionType; // either 'income' or 'expense'

    const existingTimePeriod = acc.find((item) => item.timeKey === timeKey);

    if (existingTimePeriod) {
      // If the time period exists, update income or expenses amounts
      if (type === "income") {
        existingTimePeriod.income += amount;
      } else if (type === "expense") {
        existingTimePeriod.expenses += amount;
      }
    } else {
      // If it doesn't exist, create a new entry
      acc.push({
        timeKey,
        income: type === "income" ? amount : 0,
        expenses: type === "expense" ? amount : 0,
      });
    }
    return acc;
  }, []);

  // Sort the chartData based on the selected time period
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
    expenses: {
      label: "Expenses",
      color: "hsl(var(--chart-4))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Income vs Expenses</CardTitle>
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

      {/* Bar chart rendering */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timeKey"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={0}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} className="bg-white" />
            <Bar dataKey="income" fill={chartConfig.income.color} radius={4} />
            <Bar dataKey="expenses" fill={chartConfig.expenses.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              The more you learn, the more you earn <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
