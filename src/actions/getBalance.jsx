"use server"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

async function getBalance() {
  const user=await currentUser();
  if(!user)
  {
    return {error:"user not found"}
  }

  try{
    const transactions=await db.transaction.findMany({
        where:{
            userId:user.id,
        }
    })
    const balance=transactions.reduce((sum,transaction)=>
        transaction.transactionType==="income"?sum+transaction.amount:sum-transaction.amount,0);
    const income=transactions.reduce((sum,transaction)=>transaction?.transactionType==="income"?sum+transaction.amount:sum,0);
    const expense=transactions.reduce((sum,transaction)=>transaction?.transactionType==="expense"?sum+transaction.amount:sum,0);
    const length=transactions.length;
    return {balance,income,expense,length};
  }
  catch(error)
  {
    return {error:"error finding balance"}
  }
}

export default getBalance