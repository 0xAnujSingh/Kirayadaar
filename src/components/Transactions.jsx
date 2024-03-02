import React, { useEffect, useState } from "react";
import TransactionService from "./Services/TransactionService";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../@/components/ui/table";

const Transactions = ({ tenantId }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAllTransactions();
  }, []);
  const getAllTransactions = async () => {
    const collectionRef = TransactionService.ref();
    const q = query(
      collectionRef,
      where("tenantId", "==", tenantId),
      orderBy("date", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setTransactions(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((trans) => {
            return (
              <TableRow key={trans.id}>
                <TableCell>{trans.type}</TableCell>
                <TableCell>{trans.quantity}</TableCell>
                <TableCell>{trans.item}</TableCell>
                <TableCell>{trans.date.toDate().toDateString()}</TableCell>
                <TableCell>₹{trans.price}</TableCell>
                <TableCell>₹{trans.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transactions;
