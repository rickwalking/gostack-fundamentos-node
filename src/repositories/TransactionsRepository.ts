import Transaction from '../models/Transaction';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}

interface CreateTransactionDTO {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}

class TransactionsRepository {
    private transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    public all(): Transaction[] {
        return this.transactions;
    }

    public getBalance(): Balance {
        const income: number = this.getSumTransactions('income');

        const outcome = this.getSumTransactions('outcome');

        return {
            income,
            outcome,
            total: income - outcome,
        };
    }

    public create({ title, value, type }: CreateTransactionDTO): Transaction {
        const transaction = new Transaction({
            title,
            value,
            type,
        });

        this.transactions.push(transaction);

        return transaction;
    }

    private getSumTransactions(type: 'income' | 'outcome'): number {
        return this.transactions
            .filter((transaction: Transaction) => transaction.type === type)
            .map((transaction: Transaction) => transaction.value)
            .reduce(
                (previous: number, current: number) => previous + current,
                0,
            );
    }
}

export default TransactionsRepository;
