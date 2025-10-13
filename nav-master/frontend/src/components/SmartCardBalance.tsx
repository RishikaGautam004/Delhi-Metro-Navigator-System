import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Minus, History, TrendingDown, AlertCircle, RefreshCw } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  balance: number;
  date: Date;
}

const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  let balance = 500;

  const mockData = [
    { type: 'credit', amount: 500, desc: 'Card Recharge' },
    { type: 'debit', amount: 30, desc: 'Rajiv Chowk → AIIMS' },
    { type: 'debit', amount: 20, desc: 'AIIMS → Saket' },
    { type: 'debit', amount: 40, desc: 'Saket → New Delhi' },
    { type: 'debit', amount: 30, desc: 'New Delhi → Chandni Chowk' },
    { type: 'credit', amount: 200, desc: 'Card Recharge' },
    { type: 'debit', amount: 50, desc: 'Chandni Chowk → Dwarka' },
    { type: 'debit', amount: 20, desc: 'Dwarka → Rajouri Garden' }
  ];

  mockData.forEach((data, index) => {
    if (data.type === 'credit') {
      balance += data.amount;
    } else {
      balance -= data.amount;
    }

    transactions.push({
      id: `txn-${index + 1}`,
      type: data.type as 'debit' | 'credit',
      amount: data.amount,
      description: data.desc,
      balance: balance,
      date: new Date(Date.now() - (mockData.length - index) * 86400000)
    });
  });

  return transactions.reverse();
};

export const SmartCardBalance: React.FC = () => {
  const [balance, setBalance] = useState(530);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [showRecharge, setShowRecharge] = useState(false);

  useEffect(() => {
    setTransactions(generateMockTransactions());
  }, []);

  const quickRechargeAmounts = [100, 200, 500, 1000];

  const handleRecharge = (amount: number) => {
    const newBalance = balance + amount;
    setBalance(newBalance);

    const newTransaction: Transaction = {
      id: `txn-${Date.now()}`,
      type: 'credit',
      amount: amount,
      description: 'Card Recharge',
      balance: newBalance,
      date: new Date()
    };

    setTransactions([newTransaction, ...transactions]);
    setRechargeAmount('');
    setShowRecharge(false);
  };

  const handleCustomRecharge = () => {
    const amount = parseInt(rechargeAmount);
    if (amount && amount > 0 && amount <= 5000) {
      handleRecharge(amount);
    }
  };

  const monthlySpending = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const averageJourney = monthlySpending / transactions.filter(t => t.type === 'debit').length || 0;

  return (
    <div className="space-y-6">
      <div className="metro-card bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 mr-3" />
            <div>
              <h3 className="text-2xl font-bold">Smart Card</h3>
              <p className="text-sm opacity-90">Metro Travel Card</p>
            </div>
          </div>
          <button
            onClick={() => setTransactions(generateMockTransactions())}
            className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-sm opacity-90 mb-2">Current Balance</div>
          <div className="text-5xl font-bold">₹{balance}</div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setShowRecharge(!showRecharge)}
            className="flex-1 bg-white text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Recharge
          </button>
        </div>

        {balance < 100 && (
          <div className="mt-4 p-3 bg-yellow-500 bg-opacity-20 border border-yellow-300 border-opacity-30 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm">Low balance! Recharge soon to avoid service interruption.</span>
          </div>
        )}
      </div>

      {showRecharge && (
        <div className="metro-card bg-gradient-to-r from-green-50 to-blue-50">
          <h4 className="font-bold text-gray-800 mb-4">Quick Recharge</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {quickRechargeAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleRecharge(amount)}
                className="p-4 bg-white border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <div className="text-2xl font-bold text-blue-600">₹{amount}</div>
              </button>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Amount</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
                placeholder="Enter amount (max ₹5000)"
                min="1"
                max="5000"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleCustomRecharge}
                disabled={!rechargeAmount || parseInt(rechargeAmount) <= 0}
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all ${
                  (!rechargeAmount || parseInt(rechargeAmount) <= 0) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Recharge
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="metro-card bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-purple-600 mb-1">Monthly Spending</div>
              <div className="text-2xl font-bold text-purple-700">₹{monthlySpending}</div>
            </div>
            <TrendingDown className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="metro-card bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-blue-600 mb-1">Avg per Journey</div>
              <div className="text-2xl font-bold text-blue-700">₹{Math.round(averageJourney)}</div>
            </div>
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="metro-card bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-green-600 mb-1">Total Journeys</div>
              <div className="text-2xl font-bold text-green-700">
                {transactions.filter(t => t.type === 'debit').length}
              </div>
            </div>
            <History className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="metro-card">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center">
          <History className="w-5 h-5 mr-2 text-gray-600" />
          Recent Transactions
        </h4>

        <div className="space-y-2">
          {transactions.slice(0, 10).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center flex-1">
                <div
                  className={`p-2 rounded-lg mr-3 ${
                    transaction.type === 'credit'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}
                >
                  {transaction.type === 'credit' ? (
                    <Plus className={`w-5 h-5 text-green-600`} />
                  ) : (
                    <Minus className={`w-5 h-5 text-red-600`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{transaction.description}</div>
                  <div className="text-xs text-gray-500">
                    {transaction.date.toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-bold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </div>
                <div className="text-xs text-gray-500">Bal: ₹{transaction.balance}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="metro-card bg-gradient-to-r from-blue-50 to-purple-50">
        <h4 className="font-bold text-gray-800 mb-3">Smart Card Benefits</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Get 10% discount on every journey</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>No need to stand in queue for tokens</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Valid for 10 years from date of issue</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Can be recharged online or at stations</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
