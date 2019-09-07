import React from 'react';
import { LayoutAuth } from '../layouts/auth';
import { TableTransactions } from '../components/TableTransactions';
import { Accounts } from '../components/AccountCard';
import { useModalCtx } from '../store/modal';
import { Button } from 'antd';
import { AddTransaction } from '../components/AddTransaction';

const addTransactionModalConfig = {
	// open: true,
	title: 'Register New Transaction',
	element: <AddTransaction />
};

export default () => {
	const { openModal } = useModalCtx();

	return (
		<LayoutAuth title="Dashboard">
			<Accounts />
			<br />
			<Button onClick={() => openModal(addTransactionModalConfig)}>Open Modal</Button>
			<br />
			<TableTransactions />
		</LayoutAuth>
	);
};
7;
