"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoBagAddOutline } from "react-icons/io5";
import AddTransaction from '@/actions/addTransaction';
import { Toaster,toast } from "react-hot-toast";

const TransForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const { register, handleSubmit, watch, formState: { errors },reset } = useForm();

  const incomeCategories = ['Salary', 'Investment', 'Freelance', 'Other'];
  const expenseCategories = ['Food', 'Rent', 'Travel', 'Utilities', 'Other'];

  const onSubmit = async(formData) => {
    setIsOpen(false);
    const response=await AddTransaction(formData);
    reset();
    if (response && !response.error) {
      toast.success("Transaction successful", {
        position: "top-right",
      });
    } else {
      toast.error("Transaction failed", {
        position: "top-right",
      });
    }
  };
  const watchedTransactionType = watch('transactionType', transactionType);

  return (
    <>
      {/* Button to trigger the dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen} className="text-blue-800">
        <DialogTrigger asChild>
          <IoBagAddOutline className="h-6 w-6 cursor-pointer" onClick={() => setIsOpen(true)}/>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Fill out the form and click save to add Transaction.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {/* Title input */}
            <div className="gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="col-span-3"
              />
              {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
            </div>

            {/* Transaction type (income/expense) */}
            <div className="gap-4">
              <Label className="text-right">Transaction Type</Label>
              <div className="col-span-3">
                <Label className="mr-4">
                  <input
                    type="radio"
                    value="income"
                    {...register('transactionType', { required: 'Transaction type is required' })}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="mr-2"
                  />
                  Income
                </Label>
                <Label>
                  <input
                    type="radio"
                    value="expense"
                    {...register('transactionType', { required: 'Transaction type is required' })}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="mr-2"
                  />
                  Expense
                </Label>
              </div>
              {errors.transactionType && <span className="text-red-500 text-sm">{errors.transactionType.message}</span>}
            {/* Category dropdown */}
            {transactionType && (
              <div className="gap-4 mt-2">
                <Label className="text-right">
                  {transactionType === 'income' ? 'Income Category' : 'Expense Category'}
                </Label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className="mt-1 rounded-md p-2 w-full bg-card outline-none ring-0 border-chart-5 border"
                >
                  <option value="">Select Category</option>
                  {(transactionType === 'income' ? incomeCategories : expenseCategories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
              </div>
            )}
            </div>

            {/* Amount input */}
            <div className="gap-4">
              <Label htmlFor="amount" className="text-right">Amount</Label>
              <Input
                id="amount"
                type="number"
                {...register('amount', { required: 'Amount is required' })}
                className="col-span-3"
              />
              {errors.amount && <span className="text-red-500 text-sm">{errors.amount.message}</span>}
            </div>

            {/* Date input */}
            <div className="gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input
                id="date"
                type="datetime-local"
                {...register('date', { required: 'Date is required' })}
                className="col-span-3"
              />
              {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
            </div>
            <DialogFooter>
              <Button type="submit">Save Transaction</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster/>
    </>
  );
};

export default TransForm;
