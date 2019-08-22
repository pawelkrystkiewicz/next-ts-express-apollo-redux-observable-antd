import React from 'react';
import { Icon, Divider, Button, Input } from 'antd';
import format from 'date-fns/format';
import { Table } from '../components/Table';
import { LayoutAuth } from '../layouts/auth';
import { AccountCard } from '../components/AccountCard';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import GET_TRANSACTION from '../api/GetTransactions.graphql';
import ACCOUNTS from '../api/Accounts.graphql';

import getConfig from 'next/config';
import { Spinner } from '../components/Spinner';
import { text } from 'body-parser';
// import { Modal } from '../components/Modal';

const { Search } = Input;
const {
	publicRuntimeConfig: { TEST }, // Available both client and server side
	serverRuntimeConfig: { TEST_SERVER } // Only available server side
} = getConfig();

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		width: 150,
		render: text => {text}
	},
	{
		title: 'Value',
		width: 100,
		render: (text,{ value, currency }) => {`${value} ${currency ? currency : 'zł'}`}
	},

	{
		title: 'Date',
		dataIndex: 'createdAt',
		key: 'createdAt',
		width: 200,
		render: (text) => {`${format(new Date(text), `DD.MM.YYYY`)}`}
	},
	{
		title: 'Category',
		dataIndex: 'category',
		key: 'category'
	}
];


const AccountsData = () => {
	let { loading, error, data: { accounts } } = useQuery(ACCOUNTS, {});
	switch (true) {
		case !!error:
			return <p>{JSON.stringify(error)}</p>
		case !!accounts:
			return <AccountCard data={accounts} />;
		case loading:
		default:
			return <Spinner />;
	}
};


const TransactionHistoryTable=(data?:any, loading?:any)=><>
		<Search placeholder="I am looking for..." onSearch={(value) => console.log(value)} style={{ width: 200 }} />
		{console.log(data)}
		<Table
				table={{
					rowKey:(record) => record.uid,
					bordered: false,
					loading,
 					expandedRowRender : ({description}) => <p>{description}</p>,
					expandRowByClick: true,
					size: 'small',
					rowSelection: {},
					scroll: { y: 600 },
					hasData: !loading,
					expandIconAsCell: false,
					expandIcon: () => <span/>
				}}
					data={data}
					columns={columns}
			/>

			</>


const HistoryInTable = ()=>{

	const { loading, error, data: { transactions } } = useQuery(GET_TRANSACTION, {});

	if(loading) return <TransactionHistoryTable	loading={loading} data={transactions}	/>;
}


export default () => {

	return (
		<LayoutAuth title="Dashboard">
			<AccountsData /><br/>
			<HistoryInTable/>
		</LayoutAuth>
	);
};
