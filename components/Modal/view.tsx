import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import IProps from './interface';
import './index.scss';

export default ({ props,children }: IProps) => {
	const { visible, config,  executeOnOK } = props;
	const [ state, setState ] = useState(visible);

	const closeModal = () => setState(false);

	return (
		<Modal
			centered
			title={config.title}
			visible={state}
			onOk={() => {
				closeModal();
				if(!!executeOnOK) executeOnOK()
			}}
			onCancel={closeModal}
		>
			{children}
		</Modal>
	);
};
