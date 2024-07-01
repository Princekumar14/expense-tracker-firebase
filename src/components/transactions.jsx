import React from 'react'
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useTransactions } from '../hooks/useTransactions';


export const Transactions = ({transactions}) => {
  // const {transactions} = useTransactions();
  // const transactions = useSelector(state => state.transactions)
  // // console.log(transactions,"transactions")
  const filteredTransactions = transactions;



  return (
    <>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {filteredTransactions.map((transaction) => {
            const { description, transactionAmount, transactionType } = transaction;
            return (
              <li key={transaction.id}>
                <h4> {description} </h4>
                <p>
                ₹{transactionAmount} •{" "}
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

  )

}

function Students() {

}

export default Students