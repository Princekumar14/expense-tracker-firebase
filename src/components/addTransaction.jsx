import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../features/featurs_all/transaction/transactionSlice";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseDB/config/firebase-config";
import { useNavigate } from "react-router-dom";
import { ADD_TRANSACTION } from "../constant/constant";
import { Transactions } from "./transactions";
import { useTransactions } from "../hooks/useTransactions";


// const balance = transactionTotals.balance;
// const income = transactionTotals.income;
// const expenses = transactionTotals.expenses;

export const AddTransaction = () => {
    const navigate = useNavigate();
    const { name, email, photo, isAuth, userId } = useGetUserInfo();

    const [transaction, setTransaction] = useState({
        description: "",
        transactionAmount: 0,
        transactionType: "expense"
    });
    const { description, transactionAmount, transactionType } = transaction;
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(transaction, "at dispatch addTransaction.jsx");
        dispatch({ type: ADD_TRANSACTION, data: transaction });

        // setTransaction({
        //     description: "",
        //     transactionAmount: 0,
        //     transactionType: "expense"  
        // });
    };
    const handleChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });
        // console.log(transaction);
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

    // const transactionTotals = useSelector(state => state.transactionTotals)
    // console.log(transactionTotals, "transactionTotals");
    const {transactionTotals, transactions} = useTransactions();
    const initialSearchData = {
        searchText: "",
        fromTime: "",
        toTime: ""
    }

    const [searchValues, setSearchvalues] = useState(initialSearchData);
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchvalues({ ...searchValues, [e.target.name]: e.target.value });
    }
    

    useEffect(() => {
        let filtered = transactions;

        const { searchText, fromTime, toTime } = searchValues;
        console.log(searchValues, transactions);
    
        if (searchValues.searchText !== "" && searchValues.searchText.length > 2) {
          const trimmedSearchValue = searchValues.searchText.trim().toLowerCase();
    
          if (searchValues.fromTime !== "" && searchValues.toTime !== "") {
            const fromTime = new Date(searchValues.fromTime);
            const toTime = new Date(searchValues.toTime);
    
            filtered = transactions.filter((transaction) => {
              const transactionDate = new Date(transaction.createdAt.toDate());
              return transactionDate >= fromTime && transactionDate <= toTime && transaction.description.toLowerCase().includes(trimmedSearchValue);
            });
          } else {
            filtered = transactions.filter((transaction) => {
              return transaction.description.toLowerCase().includes(trimmedSearchValue);
            });
          }
        } else if (searchValues.searchText === "" && searchValues.fromTime !== "" && searchValues.toTime !== "") {
          const fromTime = new Date(searchValues.fromTime);
          const toTime = new Date(searchValues.toTime);
    
          filtered = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.createdAt.toDate());
            return transactionDate >= fromTime && transactionDate <= toTime;
          });
        }
    
        setFilteredTransactions(filtered);
      }, [searchValues, transactions]);



    return (
        <>
            <div className="expense-tracker">
                <div className="container">
                    <h1>{name}'s Expense Tracker</h1>
                    <div className="balance">
                        <h3>Your Balance</h3>
                        {/* {console.log(transactionTotals)} */}
                        {transactionTotals.balance < 0 ? <h2 style={{ color: 'red' }}>{transactionTotals.balance}</h2> : <h2 style={{ color: 'green' }}>₹ {transactionTotals.balance}</h2>}
                        {/* <h2>{balance}</h2> */}
                    </div>

                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <p style={{ color: 'green' }}>₹ {transactionTotals.income}</p>
                        </div>
                    </div>
                    <div className="expenses">
                        <h4>Expenses</h4>

                        <p style={{ color: 'red' }}>₹ {transactionTotals.expenses}</p>
                    </div>
                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input type="text" placeholder="Description" required
                            value={description} name="description"
                            onChange={(e) => handleChange(e)}
                        />
                        <input type="number" placeholder="Amount" required
                            value={transactionAmount} name="transactionAmount"
                            onChange={(e) => handleChange(e)}
                        />
                        <input type="radio" id="expense" value="expense"
                            checked={transactionType === "expense"} name="transactionType"
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor="expense"> Expense</label>
                        <input type="radio" id="income" value="income"
                            checked={transactionType === "income"} name="transactionType"
                            onChange={(e) => handleChange(e)}
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
                <div className="time-range" style={{ marginTop: '20px' }} >
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
            < Transactions transactions={filteredTransactions}/>
        </>
    );

}