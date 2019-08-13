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
/**
 * 	handleToggle = (prop) => (enable) => {
		this.setState({ [prop]: enable });
	};

	handleSizeChange = (e) => {
		this.setState({ size: e.target.value });
	};

	handleExpandChange = (enable) => {
		this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
	};

	handleRowSelectionChange = (enable) => {
		this.setState({ rowSelection: enable ? {} : undefined });
	};

	handleScollChange = (enable) => {
		this.setState({ scroll: enable ? scroll : undefined });
	};

	handleDataChange = (hasData) => {
		this.setState({ hasData });
	};

	handlePaginationChange = (e) => {
		const { value } = e.target;
		this.setState({
			pagination: value === 'none' ? false : { position: value }
		});
	};
 */
