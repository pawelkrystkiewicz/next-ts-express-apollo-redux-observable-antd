import React from 'react';
import { Icon, Divider } from 'antd';
import format from 'date-fns/format';
import { Table } from '../components/Table';

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		width: 150,
		render: (text) => <a href="javascript:;">{text}</a>
	},
	{
		title: 'Value',

		width: 100,
		render: (record) => <span>{`${record.amount} ${record.currency}`}</span>
	},

	{
		title: 'Date',
		dataIndex: 'date',
		key: 'date',
		width: 200
	},
	{
		title: 'Category',
		dataIndex: 'category',
		key: 'category'
	},
	{
		title: null,
		key: 'action',
		width: 150,
		render: (text, record) => (
			<span>
				<a href="javascript:;">Edit</a>
				<Divider type="vertical" />
				<a href="javascript:;" className="ant-dropdown-link">
					Actions <Icon type="down" />
				</a>
			</span>
		)
	}
];

let data = [];

for (let i = 1; i <= 25; i++) {
	data.push({
		key: i,
		name: `Zakupy #${i}`,
		amount: i * 2.5,
		currency: `zł`,
		date: `${format(new Date(), `DD-MM-YYYY`)}`,
		description: `Jedzenie`,
		category: `Food`
	});
}

const expandedRowRender = (record) => <p>{record.description}</p>;

const table = {
	bordered: false,
	loading: false,
	expandedRowRender,
	expandRowByClick: true,
	size: 'small',
	rowSelection: {},
	scroll: { y: 240 },
	hasData: !!data,
	expandIconAsCell: false,
	expandIcon: () => <span />
};

export default () => <Table table={table} data={data} columns={columns} />;
