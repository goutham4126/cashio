"use server"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";
async function deleteTransaction(transactionId)
{
    const user=await currentUser();
    if(!user)
    {
        return {error:"no user found"}
    }
    try{
        await db.transaction.delete({
            where:{
                id:transactionId,
                userId:user.id
            }
        })

        revalidatePath('/');
        return {message:"Transaction deleted"}
    }
    catch(error)
    {
        return {error:"error deleting transaction"}
    }
}

export default deleteTransaction;