"use server";
import React from "react";
import getTransactions from "@/actions/getTransactions";
import { Donut } from "./PieChart";

const PieComponent = async() => {
  const transactions= await getTransactions();
  return (
    <div className="flex-1">
      {transactions?.length > 0 &&
        <Donut transactions={transactions} />
      }
    </div>
  );
};

export default PieComponent;
