import React, { Fragment } from 'react';
import { Input } from 'antd';
import format from 'date-fns/format';
import { useQuery } from '@apollo/react-hooks';
import { Table } from '../Table';
import GET_TRANSACTIONS from '../../api/GetTransactions.graphql';

const { Search } = Input;

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		width: 150,
		render: (text) => {
			text;
		}
	},
	{
		title: 'Value',
		key: 'value',
		dataIndex: 'value',
		width: 100,
		render: (text, { value, currency }) => {
			`${value} ${currency ? currency : 'zł'}`;
		}
	},

	{
		title: 'Date',
		dataIndex: 'createdAt',
		key: 'createdAt',
		width: 200,
		render: (text) => {
			`${format(new Date(text), `DD.MM.YYYY`)}`;
		}
	},
	{
		title: 'Category',
		dataIndex: 'categories',
		key: 'categories'
	}
];

const TableTransactions = () => {
	let { loading, error, data: { transactions } } = useQuery(GET_TRANSACTIONS, {});
	return (
		<Fragment>
			<Search placeholder="I am looking for..." onSearch={(value) => console.log(value)} style={{ width: 200 }} />
			{/* {console.log(transactions)} */}
			{loading && (
				<Table
					table={{
						rowKey: (record) => record.uid,
						bordered: false,
						loading,
						expandedRowRender: ({ description }) => <p>{description}</p>,
						expandRowByClick: true,
						size: 'small',
						rowSelection: {},
						// hasData:!loading &&!!transactions,
						scroll: { y: 600 },
						expandIconAsCell: false,
						expandIcon: () => <span />
					}}
					data={transactions}
					columns={columns}
				/>
			)}
			{!loading &&
			!!transactions && (
				<Table
					table={{
						rowKey: (record) => record.uid,
						bordered: false,
						loading: false,
						expandedRowRender: ({ description }) => <p>{description}</p>,
						expandRowByClick: true,
						size: 'small',
						rowSelection: {},
						hasData: transactions,
						scroll: { y: 600 },
						expandIconAsCell: false,
						expandIcon: () => <span />
					}}
					data={transactions}
					columns={columns}
				/>
			)}
		</Fragment>
	);
};

export default TableTransactions;