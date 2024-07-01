// import { db } from "../config/firebase-config";
// import { collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import { getDatabase, ref, set, onValue, get  } from "firebase/database";

// const studentCollectionRef = collection(db, "students")

import { addDoc, collection, serverTimestamp, query, where, orderBy, onSnapshot, getDocs } from "firebase/firestore";

import { db } from "../../firebaseDB/config/firebase-config";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

class TransactionActions {
    add_new_transaction = async (newTransaction) => {
        try {
            let date = serverTimestamp();
            // console.log(newTransaction, "hello", date);
            const transactionCollectionRef = collection(db, 'transactions');
            const { userId } = useGetUserInfo();


             var pro=   await addDoc(transactionCollectionRef, {
                    userId: userId,
                    description: newTransaction.data.description,
                    transactionAmount: newTransaction.data.transactionAmount,
                    transactionType: newTransaction.data.transactionType, 
                    createdAt: serverTimestamp()
                });
                console.log(pro, "pro");

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }

    }
    get_all_transactions = async () => {
        let unsubscribe;
        let error = false;
        let response;;
        let docs = [];
        try {

            const transactionCollectionRef = collection(db, 'transactions');
            const { userId } = useGetUserInfo();
            const queryTransactions = query(transactionCollectionRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(queryTransactions);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                const data = doc.data();
                const id = doc.id;
                docs.push({ ...data, id });
                


              });
            // unsubscribe = onSnapshot(queryTransactions, (snapshot) => {   
                
            //     snapshot.forEach((doc) => {
            //         const data = doc.data();
            //         const id = doc.id;
            //         docs.push({ ...data, id });
            //     });
            //     // return docs;
            // });
            // return unsubscribe;
            // console.log(unsubscribe, "unsubscribe get all");
        } catch (error) {
            console.log(error);
            error = true;
            // return false;
        }

        return { error, response: docs };
    }


}

export default new TransactionActions()