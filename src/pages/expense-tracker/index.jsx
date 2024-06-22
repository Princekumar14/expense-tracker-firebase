import { useEffect, useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {

    const { addTransaction } = useAddTransaction();

    const { transactions, transactionTotals } = useGetTransactions();
    // console.log(transactions[0]);
    const { name, email, photo, isAuth, userId } = useGetUserInfo();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");
    const [searchValue, setSearchvalue] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    const { balance, income, expenses } = transactionTotals;
    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(description, transactionAmount, transactionType);
        addTransaction({
            description,
            transactionAmount,
            transactionType
        })

        setDescription("");
        setTransactionAmount("");
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchvalue(e.target.value);
    }

    useEffect(() => {
        if(searchValue.length> 2){
            const trimedSearchValue = searchValue.trim();
            console.log(searchValue);

            const filtered = transactions.filter((transaction) => {
                return transaction.description.toLowerCase().includes(trimedSearchValue.toLowerCase());
            })
            setFilteredTransactions(filtered);

            
        }else{
            setFilteredTransactions(transactions);
        }
    }, [searchValue, transactions]);



    return (
        <>
            <div className="expense-tracker">
                <div className="container">
                    <h1>{name}'s Expense Tracker</h1>
                    <div className="balance">
                        <h3>Your Balance</h3>
                        {/* {console.log(transactionTotals)} */}
                        {balance < 0 ? <h2 style={{ color: 'red' }}>{balance}</h2> : <h2 style={{ color: 'green' }}>{balance}</h2>}
                        {/* <h2>{balance}</h2> */}
                    </div>

                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <p style={{ color: 'green' }}>{income}</p>
                        </div>
                    </div>
                    <div className="expenses">
                        <h4>Expenses</h4>

                        <p style={{ color: 'red' }}>{expenses}</p>
                    </div>
                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input type="text" placeholder="Description" required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input type="number" placeholder="Amount" required
                            value={transactionAmount}
                            onChange={(e) => setTransactionAmount(e.target.value)}
                        />
                        <input type="radio" id="expense" value="expense"
                            checked={transactionType === "expense"}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="expense"> Expense</label>
                        <input type="radio" id="income" value="income"
                            checked={transactionType === "income"}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="income"> Income</label>

                        <button type="submit"> Add Transaction</button>
                    </form>
                </div>
                {photo && (
                    <div className="profile">
                        {" "}
                        <img className="profile-photo" src={photo} />
                        <button className="sign-out-button" onClick={signUserOut}>
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
            <div className="search-bar">
                <h3>Search</h3>
                <form action="">
                    <input type="text" placeholder="Search" onChange={(e) => handleSearch(e)} />
                </form>
            </div>
            <div className="transactions">
                <h3>Transactions</h3>
                <ul>
                    {filteredTransactions.map((transaction) => {
                        const { description, transactionAmount, transactionType } = transaction;
                        return (
                            <li key={transaction.id}>
                                <h4> {description} </h4>
                                <p>
                                    ${transactionAmount} •{" "}
                                    <label
                                        style={{
                                            color: transactionType === "expense" ? "red" : "green",
                                        }}
                                    >
                                        {" "}
                                        {transactionType}{" "}
                                    </label>
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}