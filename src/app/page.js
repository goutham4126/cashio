"use server"
import { Suspense } from "react";
import NotLogin from "@/components/NotLogin";
import { currentUser } from "@clerk/nextjs/server";
import { FaRupeeSign } from "react-icons/fa";
import getBalance from "@/actions/getBalance";
import MainComponent from "@/components/LineGraph/MainComponent";
import BarComponent from "@/components/BarGraph/BarComponent";
import PieComponent from "@/components/Donut/PieComponent";
import TableComponent from "@/components/DisplayTable/TableComponent";

export default async function Home() {
  const user=await currentUser();
  const {balance,income,expense,length}=await getBalance();
  if(!user)
  {
    return <NotLogin/>
  }
  return (

    <Suspense fallback={
    <div className="flex justify-center items-center w-full h-[90vh]">
      <h1 className="text-lg font-bold text-chart-4">
        Please wait ...
      </h1>
    </div>}>
      <div className="flex gap-10 mt-4">
       <div className="flex-1 flex items-center p-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] border-2 border-chart-5 rounded-2xl h-32">
            <div className="bg-card p-4 mr-5">
              <FaRupeeSign className="h-10 w-10 "/>
            </div>
            <div>
               <h1 className="text-lg font-medium text-chart-1">Transactions</h1>
               <p className="text-sm text-chart-4 font-bold">{length}</p>
            </div>
        </div>
        <div className="flex-1 flex items-center p-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  border-2 border-chart-5 rounded-2xl h-32">
            <div className="bg-card p-4 mr-5">
              <FaRupeeSign className="h-10 w-10 "/>
            </div>
            <div>
               <h1 className="text-lg font-medium text-chart-1">Total Income</h1>
               <p className="text-sm text-green-600 font-bold">{income}</p>
            </div>
        </div>
        <div className="flex-1 flex items-center p-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] border-2 border-chart-5 rounded-2xl h-32">
            <div className="bg-card p-4 mr-5">
              <FaRupeeSign className="h-10 w-10 "/>
            </div>
            <div>
               <h1 className="text-lg font-medium text-chart-1">Total Expenses</h1>
               <p className="text-sm text-red-600 font-bold">{expense}</p>
            </div>
        </div>
        <div className="flex-1 flex items-center p-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] border-2 border-chart-5 rounded-2xl h-32">
            <div className="bg-card p-4 mr-5">
              <FaRupeeSign className="h-10 w-10 "/>
            </div>
              {
                balance>=0?
                <div>
                  <h1 className="text-lg font-medium text-chart-1">Balance</h1>
                  <p className="text-sm text-blue-600 font-bold">{balance}</p>
                </div>
                :
                <div>
                  <h1 className="text-lg font-medium text-chart-1">Debt</h1>
                  <p className="text-sm text-blue-600 font-bold">{balance}</p>
                </div>
              }
        </div>
    </div>
    <div className="flex gap-4 mt-10">
        <div>
          <PieComponent/>
        </div>
        <div className="flex-1">
          <TableComponent/>
        </div>
      </div>
     <div className="flex gap-4 mt-8 items-center">
        <div className="flex-1">
            <MainComponent/>
        </div>
        <div className="flex-1">
          <BarComponent/>
        </div>
      </div>
    </Suspense>
  );
}
