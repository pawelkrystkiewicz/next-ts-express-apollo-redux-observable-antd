import React, { useState } from 'react';
import { Button, Statistic } from 'antd';
import IProps from './interface.d';
import './index.scss';
// import { RegisterTransaction } from '../AddTransaction';
import { useQuery } from '@apollo/react-hooks';
import {ACCOUNTS} from '../../api/UserDetails.graphql';
import { Spinner } from '../Spinner';

const AccountCard = ({ data }: IProps) => {
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
					<Statistic
						title={`${name}`}
						value={1128.93}
						precision={2}
						suffix="zł" //currency symbol
					/>
						{/* <Button
									onClick={() => toggleModal()}
									className="account-card--add"
									shape="circle"
									type="link"
									icon="more"
								/> */}
					{/* <RegisterTransaction
						props={{
							modalVisible,
							accountName: name,
							currency: `PLN`
						}}
					/> */}
				</div>
			))}
		</div>
	);
};

export default () => {
	let { loading, error, data: { accounts } } = useQuery(ACCOUNTS, {});
	switch (true) {
		case !!error:
			return <span>{error}</span>;
		case !!accounts:
			return <AccountCard data={accounts} />;
		case loading:
		default:
			return <Spinner />;
	}
};
