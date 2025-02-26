import Transaction from '../interfaces/Transaction';
import TransactionType from '../enums/TransactionType';

export const transactions: Transaction[] = [
	{
		transactionType: TransactionType.DEPOSIT,
		amount: 100n,
		description: 'pay'
	},
	{
		transactionType: TransactionType.WITHDRAWAL,
		amount: 39n,
		description: 'rent'
	},
	{
		transactionType: TransactionType.WITHDRAWAL,
		amount: 11n,
		description: 'groceries'
	},
	{
		transactionType: TransactionType.WITHDRAWAL,
		amount: 1n,
	}
];
