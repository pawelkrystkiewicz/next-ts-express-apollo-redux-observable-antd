import React, { useState } from 'react';
import { Table } from 'antd';
import IProps, { Pagination, Size } from './interface.d';

const pagination: Pagination = { position: 'bottom' };

export default ({ table, data, columns }: IProps) => {
	if (!table) {
		table = {
			bordered: false,
			loading: false,
			pagination,
			size: Size.small,
			rowSelection: {},
			scroll: { y: 500 },
			hasData: !!data
		};
	}

	const [ state, setState ] = useState(table);

	return <Table {...state} columns={columns} dataSource={state.hasData ? data : null} />;
};