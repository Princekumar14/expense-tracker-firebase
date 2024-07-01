import { ADD_TRANSACTION, GET_ALL_TRANSACTIONS } from "../constant/constant";
import { put, takeEvery } from "redux-saga/effects";
import transactionActions from "../firebaseDB/transaction_operations/transaction.actions";
import { addTransaction, errorInOperation, storeTransactions } from "../features/featurs_all/transaction/transactionSlice";



function* addTransactions(data) {

    try {
        const response = yield transactionActions.add_new_transaction(data);
        // console.log(response, "response", data);
        if (response === true) {
            yield put(addTransaction(data));
        }
        else {
            yield put(errorInOperation({
                error: true,
                msg: "all fields are required"
            }));
        }
    } catch (error) {
          yield put(errorInOperation({
              error: true,
              msg: "failed to add transaction"
          }));
        // }
    }

}

function* getAllTransactions() {

    try {
        const {error, response} = yield transactionActions.get_all_transactions();

        if (error === false) {
            // console.log(error, typeof(response), response, "saga file");
            yield put(storeTransactions(response));  
            // yield put(addTransaction());
        }
        else {
            yield put(errorInOperation({
                error: true,
                msg: "all fields are required"
            }));
        }
    } catch (error) {
          yield put(errorInOperation({
              error: true,
              msg: "failed to add transaction"
          }));
        // }
    }

}
    export function* watcherTransaction() {
        // yield takeEvery(GET_ALL_STUDENTS, getAllStudents);
        yield takeEvery(ADD_TRANSACTION, addTransactions);
        yield takeEvery(GET_ALL_TRANSACTIONS, getAllTransactions);
    }
