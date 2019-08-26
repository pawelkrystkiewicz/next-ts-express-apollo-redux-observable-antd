export default interface IProps {
	data?: Array<IData>;
};

export interface IData {
	value: number;
	currency: string;
	name: string;
	number?: string;
	description?: string;
}
