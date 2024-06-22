import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [ transactionTotals, setTransactionTotals ] = useState({
        totalExpenses: 0.0,
        totalIncome: 0.0,
        balance: 0.0
    });

    const transactionCollectionRef = collection(db, 'transactions');
    const { userId } = useGetUserInfo();


    const getTransactions = async () => {
        let unsubscribe;
        try{
            const queryTransactions = query(transactionCollectionRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalIncome = 0;
                let totalExpenses = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({ ...data, id });

                    if(data.transactionType === 'expense'){
                        totalExpenses  += Number(data.transactionAmount);
                    }else{
                        totalIncome += Number(data.transactionAmount);
                    }
                });
                setTransactions(docs);
                let balance = totalIncome - totalExpenses;

                setTransactionTotals({
                    expenses:totalExpenses,
                    income:totalIncome,
                    balance
                });
            });

            
        }
        catch(err){
            console.log(err);
        }
        
        return () => unsubscribe();
    }



    useEffect(() => {
        getTransactions();
    }, []);


    return { transactions, transactionTotals };

    
}