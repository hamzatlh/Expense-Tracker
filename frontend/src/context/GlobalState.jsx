import { createContext, useReducer } from "react";
import AppReducer from './AppReducer';
import axios from 'axios';

const InitialState = {
  transactions: [],
  loading: true,
  error: null,
  isAuthenticated: Boolean(localStorage.getItem('token')),
  user: JSON.parse(localStorage.getItem('user')) || null
};

export const GlobalContext = createContext(InitialState);

const API_URL = 'http://127.0.0.1:8000/api/transactions/';

const axiosConfig = () => ({
  headers: {
    'Authorization': `Token ${localStorage.getItem('token')}`
  }
});

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, InitialState);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: userData
    });
    getTransactions();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  async function getTransactions() {
    if (!state.isAuthenticated) {
      dispatch({
        type: 'SET_TRANSACTIONS',
        payload: []
      });
      return;
    }

    try {
      const response = await axios.get(API_URL, axiosConfig());
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: response.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: 'Error fetching transactions'
      });
    }
  }

  async function deleteTransaction(id) {
    if (!state.isAuthenticated) return;

    try {
      await axios.delete(`${API_URL}${id}/`, axiosConfig());
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: 'Error deleting transaction'
      });
    }
  }

  async function addTransaction(transaction) {
    if (!state.isAuthenticated) return;

    try {
      const response = await axios.post(API_URL, transaction, axiosConfig());
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: response.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: 'Error adding transaction'
      });
    }
  }

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      loading: state.loading,
      error: state.error,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      getTransactions,
      deleteTransaction,
      addTransaction,
      login,
      logout
    }}>
      {children}
    </GlobalContext.Provider>
  );
}