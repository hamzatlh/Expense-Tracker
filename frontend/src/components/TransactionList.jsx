import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";

const TransactionList = () => {
  const { transactions, getTransactions, loading, error, isAuthenticated } = useContext(GlobalContext);

  useEffect(() => {
    if (isAuthenticated) {
      getTransactions();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-10 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Please sign in to view your transactions.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center mt-10 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">No transactions yet. Add your first transaction above!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="border-b-2 mt-10 mb-2 m-auto items-center w-72">History</h3>
      <ul>
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;