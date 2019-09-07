import React, { useState } from 'react';
import IProps from './interface';
import './index.scss';
import { useMutation } from '@apollo/react-hooks';
import REGISTER_TRANSACTION from '../../api/RegisterTransaction.graphql';
import moment from 'moment';
import { Result, Button, Form, Select, Input, InputNumber, DatePicker, Switch } from 'antd';
import { State } from './interface';

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

const defaulState: State = {
	name: null,
	value: 0.0,
	code: 'PLN',
	accountName: null,
	categories: [],
	date: moment(new Date(), 'YYYY.MM.DD')
};

export default () => {
	const [ state, setState ] = useState<State | undefined>(defaulState);

	const handleChange = (property, value) => setState((s) => ({ ...s, [property]: value }));

	const [ registerTransaction, { data, error, loading } ] = useMutation(REGISTER_TRANSACTION, {
		variables: {
			...state,
			categoriesName: state.categories.map((name) => {
				return { name };
			})
		}
	});

	switch (true) {
		case !!error:
			return (
				<Result
					status="error"
					title="Submission Failed"
					subTitle="Please check and modify the following information before resubmitting."
					extra={[
						<Button type="primary" key="console">
							Go Console
						</Button>,
						<Button key="buy">Buy Again</Button>
					]}
				/>
			);
		case !!data:
			return (
				<Result
					status="success"
					title="Successfully Purchased Cloud Server ECS!"
					subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
					extra={[
						<Button type="primary" key="console">
							Go Console
						</Button>,
						<Button key="buy">Buy Again</Button>
					]}
				/>
			);

		default:
			return (
				<Form >
					<Form.Item>
						<Select
							size={size}
							placeholder="Account"
							value={state.accountName}
							onChange={(value) => handleChange('accountName', value)}
						>
							{userAccounts.map(({ name }) => <Option value={name}>{name}</Option>)}
						</Select>
					</Form.Item>
					<Form.Item>
						<Input
							size={size}
							placeholder="Name"
							value={state.name}
							onChange={(e) => handleChange('name', e.target.value)}
						/>
						<InputNumber
							size={size}
							value={state.value}
							onChange={(value) => handleChange('value', value)}
							step={0.01}
						/>{' '}
						{`${accountCurrency}`}
					</Form.Item>
					{/* <Form.Item>
				</Form.Item> */}
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
						<Button
							type="primary"
							shape="circle"
							icon="plus"
							loading={loading}
							onClick={() => registerTransaction()}
						/>
					</Form.Item>
				</Form>
			);
			break;
	}
};
