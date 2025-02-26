'use client'

import { JSX, useEffect, useState } from 'react';
import axios from 'axios';

// Define the shape of a Transaction object
interface Transaction {
	transactionType: string;
  amount: number;
  description: string;
}

const Transactions = (): JSX.Element => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [userAgent, setUserAgent] = useState<string>('');

  useEffect(() => {
    // Fetch the transaction data from the Nest.js backend on initial render and when userAgent changes
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<Transaction[]>('http://localhost:3000/transactions', {
          headers: {
            'X-Custom-User-Agent': userAgent,
          },
				});
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions: ', error);
      }
    };

		fetchTransactions();
  }, [userAgent]);

  const handleUserAgentClicked = () => {
    setUserAgent((previousUserAgent) => 
      previousUserAgent === '' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/537.36' : ''
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Transactions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 uppercase">{transaction.transactionType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description || 'unknown'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No transactions available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button className="mt-4 bg-blue-500 text-white p-2 rounded mb-4" onClick={handleUserAgentClicked}>Switch to {userAgent === '' ? 'mobile' : 'web'}</button>
    </div>
  );
};

export default Transactions;
