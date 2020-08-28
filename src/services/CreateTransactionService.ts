import TransactionsRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';

interface Request {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}

class CreateTransactionService {
    private transactionsRepository: TransactionsRepository;

    constructor(transactionsRepository: TransactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    public execute({ title, value, type }: Request): Transaction {
        const balance = this.transactionsRepository.getBalance();

        if (
            type === 'outcome' &&
            (balance.total === 0 || balance.total - value < 0)
        ) {
            throw Error(
                'Cannot create outcome transaction with higher value than current total',
            );
        }
        const transaction = this.transactionsRepository.create({
            title,
            type,
            value,
        });

        return transaction;
    }
}

export default CreateTransactionService;
