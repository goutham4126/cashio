"use client"
import deleteTransaction from '@/actions/deleteTransaction';
import React, { useState, useEffect } from 'react';
import { MdOutlineDelete } from "react-icons/md";

function Table({ transactions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(transactions);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const Delete=async(transactionId)=>{
     const {message,error}=await deleteTransaction(transactionId);
     if(error)
     {
       alert("not deleted");
     }
     else
     {
      alert("deleted successfully");
     }

  }
  useEffect(() => { 
    const lowercasedSearch = searchTerm.toLowerCase();
    setFilteredData(
      transactions.filter(
        (item) =>
          item.title.toLowerCase().includes(lowercasedSearch) ||
          item.category.toLowerCase().includes(lowercasedSearch)
      )
    );
    setCurrentPage(1);
  }, [searchTerm, transactions]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <main className="border-2 border-card rounded-t-xl">
      <div className="w-full flex justify-between items-center mt-1 p-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Overview of your transactions.</h3>
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <input
            className="w-full pr-11 h-10 pl-3 py-2 bg-transparent text-sm border border-card rounded focus:outline-none focus:shadow-md"
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="relative flex flex-col w-full h-full overflow-scroll text-chart-1 shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead className="bg-card">
            <tr className="border-l-4 border-l-card">
              <th className="p-4 border-b border-slate-200">Title</th>
              <th className="p-4 border-b border-slate-200">Category</th>
              <th className="p-4 border-b border-slate-200">Amount</th>
              <th className="p-4 border-b border-slate-200">Date</th>
              <th className="p-4 border-b border-slate-200">Type</th>
              <th className="p-4 border-b border-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index} className={`${item.transactionType === 'income' ? "border-l-4 border-l-green-600":"border-l-4 border-l-red-600"} text-chart-4 font-medium text-base`}>
                  <td className="p-4 py-5">{item.title}</td>
                  <td className="p-4 py-5">{item.category}</td>
                  <td className="p-4 py-5">{item.amount}</td>
                  <td className="p-4 py-5">{new Date(item.transactionTime).toLocaleDateString()}</td>
                  <td className={`p-4 py-5 text-sm ${item.transactionType === 'income' ? 'text-green-700' : 'text-red-700'}`}>
                    {item.transactionType.charAt(0).toUpperCase() + item.transactionType.slice(1)}
                  </td>
                  <td className="p-4 py-5">
                    <button className="text-red-700 hover:underline" onClick={()=>Delete(item.id)}><MdOutlineDelete className="h-5 w-5" /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-sm text-slate-500">
                  No matching transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center px-4 py-3">
          <div className="text-sm text-chart-2">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
          </div>
          <div className="flex space-x-1">
            <button
              className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-black bg-card rounded ${currentPage === 1 ? 'cursor-not-allowed' : 'text-black bg-card'}`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal ${currentPage === page + 1 ? 'text-white bg-chart-1' : 'text-black bg-card'}`}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-black bg-card rounded ${currentPage === totalPages ? 'cursor-not-allowed' : 'text-black bg-card'}`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Table;
