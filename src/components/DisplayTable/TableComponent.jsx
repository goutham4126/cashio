"use server";
import React from "react";
import getTransactions from "@/actions/getTransactions";
import Table from "./Table";

const TableComponent = async() => {
  const transactions= await getTransactions();
  return (
    <div className="flex-1">
      {transactions?.length > 0 &&
        <Table transactions={transactions} />
      } 
    </div>
  );
};

export default TableComponent;
