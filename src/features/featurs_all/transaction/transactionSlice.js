import { createSlice } from "@reduxjs/toolkit";
// import { useGetUserInfo } from "../../../hooks/useGetUserInfo";
import { serverTimestamp } from "firebase/firestore";

const GetUserInfo = () => {
    const { name, email, photo, isAuth, userId } = JSON.parse(localStorage.getItem('user'));

    return { name, email, photo, isAuth, userId };
}
const { name, email, photo, isAuth, userId } = GetUserInfo();
// const userId = 20;

const initialState = {
    transactions: [],
    transactionTotals: {
        balance: 0,
        income: 0,
        expenses: 0
    },
    messages: {
        error: false,
        msg: ""
    }
};

export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        storeTransactions: (state, action) => {
            // console.log(state, "state");
            
            let data = action.payload;
            let totalIncome = 0;
            let totalExpenses = 0;
            
            state.transactions.forEach((doc) => {
                if(doc.transactionType === 'expense'){
                    totalExpenses  += Number(doc.transactionAmount);
                }else{
                    totalIncome += Number(doc.transactionAmount);
                }
                // console
                
             });
             let balance = totalIncome - totalExpenses;

             let transactionTotalsData = {
                 expenses:totalExpenses,
                 income:totalIncome,
                 balance
             }

            //  console.log(transactionTotalsData, "transactionTotalsData");
             state.transactionTotals = transactionTotalsData;

             state.transactions = data;
        },
        addTransaction: (state, action) => {
            console.log(action.payload, "payload", action.payload.data.description);
            const transaction = {
                userId : userId,
                description: action.payload.data.description,
                transactionAmount: action.payload.data.transactionAmount,
                transactionType: action.payload.data.transactionType,
                createdAt:serverTimestamp()
            }
            console.log(transaction, "add_transaction");
            state.transactions.push(transaction);
        },
        errorInOperation: (state, action) => {
            const message = {
                error: action.payload.error,
                msg: action.payload.msg
            }
            state.messages = message;
        }
    }
})

export const { storeTransactions, addTransaction, errorInOperation } = transactionSlice.actions;
export default transactionSlice.reducer;