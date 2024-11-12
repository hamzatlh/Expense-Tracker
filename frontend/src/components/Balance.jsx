import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

const Balance = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
  }, []);

  const amounts = transactions.map((transaction) => parseFloat(transaction.amount));
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <div>
      <h4 className="font-bold">YOUR BALANCE</h4>
      <h1 className="font-bold text-2xl text-red-600">{total.toFixed(2)}$</h1>
    </div>
  );
};

export default Balance;