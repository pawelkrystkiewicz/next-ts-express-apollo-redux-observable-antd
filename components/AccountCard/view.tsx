import React, { useState } from 'react';
import { Button } from 'antd';
import IProps from './interface.d';
import './index.scss';
import { RegisterTransaction } from '../RegisterTransaction';

export default ({ data }: IProps) => {
	const [ state, setState ] = useState(data);
	const [ modalVisible, setModalVisible ] = useState(false);

	const toggleModal = () => {
		setModalVisible(!modalVisible);
		console.log(modalVisible);
	};

	return (
		<div className="account-cards">
			{state.map(({ currency, name, value }) => (
				<div className="account-card">
					<p>{name}</p>
					{/* <p>{`${value} ${currency}`}</p> */}
					<p>{`524,63 zł`}</p>
					<RegisterTransaction
						props={{
							modalVisible,
							accountName: name,
							currency: `PLN`
						}}
					/>
					<Button onClick={() => toggleModal()} className="account-card--add" shape="circle" icon="plus" />
				</div>
			))}
		</div>
	);
};
