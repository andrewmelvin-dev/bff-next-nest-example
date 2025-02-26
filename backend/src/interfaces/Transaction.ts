import TransactionType from 'src/enums/TransactionType';

interface Transaction {
	transactionType: TransactionType,
	amount: bigint,
	description?: string
}

export default Transaction;
