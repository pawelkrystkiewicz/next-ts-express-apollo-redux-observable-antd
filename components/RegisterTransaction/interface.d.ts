import { ReactNode } from 'react';

export default interface IProps {
	props: IModalProps;
};

export interface IModalProps {
	currency?: string;
	categories?: Array<ITransactionCategory>;
	accountName: string;
	modalVisible:Boolean;
}

export interface ITransactionCategory {
	name: string;
}
