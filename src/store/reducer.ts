
import { createSlice } from '@reduxjs/toolkit'

export interface ITransaction {
    id: number,
    amount: number,
    account: {
        name: string,
        iban: string
    },
}

export interface IBanType {
    id: number,
    firstName: string,
    lastName: string,
    IBan: string
}

interface AccountState {
    balance: number;
    transactions: Array<ITransaction>;
    beneficiary: Array<IBanType>
}

const initialState = { transactions: [], balance: 1000, beneficiary: [] } satisfies AccountState as AccountState

const accountSlice = createSlice({
    name: 'bank',
    initialState,
    reducers: {
        addTransaction(state, action) {
            const { amount, account } = action.payload;
            const newTransaction = {
                id: Date.now(),
                amount: parseFloat(amount),
                account,
            };
            state.transactions = [...state.transactions, newTransaction];
            state.balance = state.balance - parseFloat(amount);
        },
        addBeneficiary(state, action) {
            const { firstName, lastName, iban } = action.payload;
            const newBenificiary = {
                id: Date.now(),
                firstName: firstName,
                lastName: lastName,
                IBan: iban
            };
            state.beneficiary = [...state.beneficiary, newBenificiary];
        },
    },
})




export const { addTransaction, addBeneficiary } = accountSlice.actions
export default accountSlice.reducer




