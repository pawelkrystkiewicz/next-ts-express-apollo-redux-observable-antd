import React, { Fragment, useState } from 'react';
import { Input } from 'antd';
import format from 'date-fns/format';
import { useQuery } from '@apollo/react-hooks';
// import { Table } from '../Table';
import GET_TRANSACTIONS from '../../api/GetTransactions.graphql';
import { Table } from 'antd';
import './index.scss'

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
		render: (text, record, index) => {
			const { value, currency } = record;

			switch (true) {
				case value < 0:
					return (
						<span className="table--highlight table--income">{`${value} ${currency ? currency : 'zł'}`}</span>
					);

				case value > 0:
					return (
						<span className="table--highlight table--expense">{`${value} ${currency ? currency : 'zł'}`}</span>
					);
			}
		}
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
