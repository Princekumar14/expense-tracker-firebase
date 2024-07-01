import { configureStore } from "@reduxjs/toolkit";

import transactionSlice from "./featurs_all/transaction/transactionSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
// import userSlice from "./featurs_all/user/userSlice";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: transactionSlice,
    // middleware: [sagaMiddleware],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)