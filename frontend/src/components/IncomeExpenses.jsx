import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

const IncomeExpenses = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
  }, []);

  const amounts = transactions.map((transaction) => parseFloat(transaction.amount));
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc + item), 0);
  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc + item), 0);

  return (
    <div className="border flex w-72 items-center justify-center m-auto mt-10 py-5 drop-shadow-lg">
      <div className="w-auto m-auto">
        <h4>INCOME</h4>
        <p className="text-green-600 font-bold">${income.toFixed(2)}</p>
      </div>
      <div className="h-10 border-l-2 mx-4"></div>
      <div className="w-auto m-auto">
        <h4>EXPENSE</h4>
        <p className="text-red-600 font-bold">${Math.abs(expense).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;