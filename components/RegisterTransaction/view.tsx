import React, { useState } from 'react';
import IProps from './interface';
import './index.scss';
import { useMutation } from '@apollo/react-hooks';
import REGISTER_TRANSACTION from '../../api/RegisterTransaction.graphql';
import { Modal } from '../Modal';
import moment from 'moment';
import { Form, Select, Input, InputNumber, DatePicker, Switch } from 'antd';

const { Option } = Select;
const size = 'middle';

const userAccounts = [
	{
		name: 'Main account'
	},
	{
		name: 'Savings account'
	},
	{
		name: 'Company account'
	}
];

const userDefinedCategories = [
	{
		name: 'Groceries'
	},
	{
		name: 'Junk Food'
	},
	{
		name: 'Lighstabers'
	}
];
const accountCurrency = 'PLN';
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 5 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 12 }
	}
};

export default ({ props }: IProps) => {
	const [ state, setState ] = useState({
		name: '',
		value: 0.0,
		account: props.accountName,
		categories: [],
		date: moment(new Date(), 'YYYY.MM.DD')
	});

	const handleChange = (property, value) => {	setState({ ...state, [property]: value });
	};
	const [ registerTransaction, { data, error } ] = useMutation(REGISTER_TRANSACTION, {
		variables: {
			value: state.value,
			name: state.name,
			code: 'PLN',
			createdAt: state.date,
			categoriesName: state.categories.map((name) => {
				{
					name;
				}
			}),
			accountName: state.account
		}
	});

	return (
		<Modal
			props={{
				config: { title: `Register Transaction` },
				executeOnOK: () => registerTransaction(),
				visible: props.modalVisible
			}}
		>
			<Form {...formItemLayout}>
				<Form.Item>
					<Input
						size={size}
						placeholder="Name"
						value={state.name}
						onChange={(e) => handleChange('name', e.target.value)}
					/>
				</Form.Item>
				<Form.Item>
					<InputNumber
						size={size}
						value={state.value}
						onChange={(value) => handleChange('value', value)}
						step={0.01}
					/>{' '}{`${accountCurrency}`}
				</Form.Item>
				<Form.Item>
					<DatePicker
						size={size}
						format="YYYY.MM.DD"
						value={state.date}
						onChange={(date, dateString) => handleChange('date', moment(dateString, 'YYYY.MM.DD'))}
					/>
				</Form.Item>
				<Form.Item>
					<Select
						size={size}
						mode="multiple"
						placeholder="Category"
						defaultValue={[]}
						value={state.categories}
						onChange={(value) => handleChange('categories', value)}
						allowClear
					>
						{userDefinedCategories.map(({ name }) => <Option value={name}>{name}</Option>)}
					</Select>
				</Form.Item>
				<Form.Item>
					<Select
						size={size}
						placeholder="Account"
						value={state.account}
						onChange={(value) => handleChange('account', value)}
					>
						{userAccounts.map(({ name }) => <Option value={name}>{name}</Option>)}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};
