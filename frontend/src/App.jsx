import Balance from './components/Balance';
import Header from './components/Header';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import GoogleLoginComponent from './components/GoogleLoginComponent';

function App() {
  return (
    <div>
      <GlobalProvider>
        <div className="flex flex-col items-center min-h-screen p-4">
          <div className="flex justify-between items-center w-full max-w-2xl mb-4">
            <Header />
            <GoogleLoginComponent />
          </div>
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </GlobalProvider>
    </div>
  );
}
export default App;