import { TableProps, ColumnProps } from 'antd/table';

export default interface IProps {
	data?: any;
	table?: TableProps;
	columns: ColumnProps;
};

export interface Pagination {
	position: 'top' | 'bottom' | 'both';
}

export enum Size {
	'default',
	'small',
	'middle'
}
