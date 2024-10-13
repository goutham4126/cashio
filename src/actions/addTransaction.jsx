"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const AddTransaction = async(formData) => {
    const user =await currentUser();
    if (!user) {
        return { error: "User not found in the database" };
    }
    const transactionDate = new Date(formData.date);
    const amount = Number(formData.amount);
    // console.log({user,amount,transactionDate});
    try {
        
        const transactionData = await db.transaction.create({
            data: {
                title: formData.title,
                transactionType: formData.transactionType,
                category: formData.category,
                amount:amount,
                userId:user?.id,
                transactionTime: transactionDate,
            },
        });
        revalidatePath('/');
        return transactionData;
    } catch (error) {
        console.log(error)
        return { error: "Failed to add transaction" };
    }
};

export default AddTransaction;
