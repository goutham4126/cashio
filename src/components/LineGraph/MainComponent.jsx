// /app/yourComponent.js
"use server";

import React from "react";
import { MultiLine } from "./LineChart";
import getTransactions from "@/actions/getTransactions";

const MainComponent = async() => {
  const transactions= await getTransactions();

  return (
    <div className="flex-1">
      {transactions?.length > 0 && (
        <MultiLine transactions={transactions} />
      )}
    </div>
  );
};

export default MainComponent;
