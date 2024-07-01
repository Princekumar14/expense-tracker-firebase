import { useEffect, useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseDB/config/firebase-config";

export const ExpenseTracker = () => {

    const { addTransaction } = useAddTransaction();

    const { transactions, transactionTotals } = useGetTransactions();
    // console.log(transactions[0].createdAt.toDate());
    const { name, email, photo, isAuth, userId } = useGetUserInfo();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const initialSearchData = {
        searchText: "",
        fromTime: "",
        toTime: ""
    }

    const [searchValues, setSearchvalues] = useState(initialSearchData);
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
        setSearchvalues({ ...searchValues, [e.target.name]: e.target.value });
    }
    

    useEffect(() => {
        if (searchValues.searchText != "" && searchValues.searchText.length > 2) {
            const trimedSearchValue = searchValues.searchText.trim();
            console.log(searchValues);

            if(searchValues.toTime != "" && searchValues.searchText != ""){ 
                const fromTime = new Date(searchValues.fromTime);
                const toTime = new Date(searchValues.toTime);
                const filtered = transactions.filter((transaction) => {
                    const transactionDate = new Date(transaction.createdAt.toDate());
                    return transactionDate >= fromTime && transactionDate <= toTime && transaction.description.toLowerCase().includes(trimedSearchValue.toLowerCase());
                })
                setFilteredTransactions(filtered);
            }else{
                const filtered = transactions.filter((transaction) => {
                    return transaction.description.toLowerCase().includes(trimedSearchValue.toLowerCase());
                })
                setFilteredTransactions(filtered);
                console.log("hi1", filteredTransactions);

            }



        }else if ( searchValues.searchText == "" && searchValues.fromTime != "" && searchValues.toTime != "") {
            const fromTime = new Date(searchValues.fromTime);
            const toTime = new Date(searchValues.toTime);
            const filtered = transactions.filter((transaction) => {
                const transactionDate = new Date(transaction.createdAt.toDate());
                // console.log("hi", transactionDate);
                return transactionDate >= fromTime && transactionDate <= toTime;
            })
            setFilteredTransactions(filtered);
            console.log("hi2", filteredTransactions);
        }
         else {
            setFilteredTransactions(transactions);
            // console.log("hi3", filteredTransactions);
        }
        
    }, [searchValues, transactions]);



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
                            value={description} name = "description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input type="number" placeholder="Amount" required
                            value={transactionAmount} name="transactionAmount"
                            onChange={(e) => setTransactionAmount(e.target.value)}
                        />
                        <input type="radio" id="expense" value="expense"
                            checked={transactionType === "expense"} name="transactionType"
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="expense"> Expense</label>
                        <input type="radio" id="income" value="income"
                            checked={transactionType === "income"} name="transactionType"
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
                    <input type="text" placeholder="Search" name="searchText" onChange={(e) => handleSearch(e)} />
                </form>
                <div className="time-range" style={{marginTop: '20px'}} >
                    <div className="from" style={{ display: 'inline-block' }} >
                        <label htmlFor="from-time">From</label><br />

                        <input
                            type="datetime-local"
                            id="from-time"
                            name="fromTime"
                            onChange={(e) => handleSearch(e)}
                            // value="2018-06-12T19:30"
                            // min="2018-06-07T00:00"
                            // max="2018-06-14T00:00" 
                            /></div>
                    <div className="to" style={{ display: 'inline-block', marginLeft: '20px' }}>
                        <label htmlFor="to-time">To</label><br />

                        <input
                            type="datetime-local"
                            id="to-time"
                            name="toTime"
                            onChange={(e) => handleSearch(e)}
                            // value="2018-06-12T19:30"
                            // min="2018-06-07T00:00"
                            // max="2018-06-14T00:00" 
                            /></div>

                </div>
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