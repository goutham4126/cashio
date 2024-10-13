"use server";
import React from "react";
import getTransactions from "@/actions/getTransactions";
import { Component } from "./BarChart";

const BarComponent = async() => {
  const transactions= await getTransactions();
  return (
    <div className="flex-1">
      {transactions?.length > 0 && (
        <Component transactions={transactions} />
      )}
    </div>
  );
};

export default BarComponent;
