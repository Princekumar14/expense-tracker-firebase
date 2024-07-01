import { useSelector } from "react-redux";

export const useTransactions = () => {
    const transactions = useSelector(state => state.transactions);
    const transactionTotals = useSelector(state => state.transactionTotals);

    return { transactions, transactionTotals};
}