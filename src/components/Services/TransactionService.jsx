import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../firebase";

const collectionName = "Transactions";
const transactionCollectionRef = collection(db, collectionName);

class TransactionService {
  ref = () => transactionCollectionRef;

  addTransaction = (colRef, newTransaction) => {
    return addDoc(colRef, Object.assign({ date: new Date() }, newTransaction));
  };

  updateTransaction = (id, updateTransaction) => {
    const transactionDoc = doc(db, "Transactions", id);
    return updateDoc(transactionDoc, updateTransaction);
  };

  deleteTransaction = (id) => {
    const transactionDoc = doc(db, "Transactions", id);
    return deleteDoc(transactionDoc);
  };

  getAllTransaction = () => {
    return getDocs(transactionCollectionRef);
  };

  getTransactionById = (id) => {
    const transactionDoc = doc(db, "Transactions", id);
    return getDoc(transactionDoc);
  };
}

export default new TransactionService();
