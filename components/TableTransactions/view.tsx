import React, { Fragment, useState } from 'react';
import { Input } from 'antd';
import format from 'date-fns/format';
import { useQuery } from '@apollo/react-hooks';
// import { Table } from '../Table';
import GET_TRANSACTIONS from '../../api/GetTransactions.graphql';
import { Table } from 'antd';

const { Search } = Input;

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		width: 150
	},
	{
		title: 'Value',
		dataIndex: 'value',
		width: 100,
		render: (text, record, index): string => `${record.value} ${record.currency ? record.currency : 'zł'}`
	},

	{
		title: 'Date',
		dataIndex: 'createdAt',
		width: 200,
		render: (text: Date) => `${format(new Date(text), `DD.MM.YYYY`)}`
	},
	{
		title: 'Category',
		dataIndex: 'categories'
	}
];
const tableConfig = {
	columns,
	pagination: 'bottom',
	size: 'small',
	rowSelection: {},
	bordered: false,
	scroll: { y: 900 },
	rowKey: (record) => record.id
};

export default () => {
	const { loading, error, data: { transactions } } = useQuery(GET_TRANSACTIONS, {});
	return (
		<Fragment>
			<Search placeholder="I am looking for..." onSearch={(value) => console.log(value)} />
			<Table {...tableConfig} loading={loading} hasData={!!transactions} dataSource={transactions || null} />
		</Fragment>
	);
};
