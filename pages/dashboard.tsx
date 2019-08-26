import React from 'react';
import { LayoutAuth } from '../layouts/auth';
import { TableTransactions } from '../components/TableTransactions';
import { Accounts } from '../components/AccountCard';

export default () => {
	return (
		<LayoutAuth title="Dashboard">
			<Accounts />
			<br />
			<TableTransactions />
		</LayoutAuth>
	);
};
7;
