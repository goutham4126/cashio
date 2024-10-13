"use server"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"

async function getTransactions() {
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
    return transactions;
  }
  catch(error)
  {
    return {error:"error finding balance"}
  }
}

export default getTransactions