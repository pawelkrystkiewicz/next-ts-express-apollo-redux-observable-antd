import React, { useState, ReactNode } from 'react';
import { Modal } from 'antd';
import { ModalState } from './modal';

const defaultState: ModalState = {
	open: false,
	element: null,
	title: null
};

const ModalCtx = React.createContext(undefined);

const ModalProvider = (props) => {
	const [ state, setValue ] = useState(defaultState);

	const openModal = (config: ModalState) => setValue({ ...config, open: true });

	const closeModal = () => setValue({ ...state, title: null, element: null, open: false });

	return (
		<ModalCtx.Provider
			value={{
				state,
				openModal,
				closeModal
			}}
			{...props}
		>
			{state.open && (
				<Modal
					centered
					title={state.title}
					visible={state.open}
					onOk={closeModal}
					onCancel={closeModal}
					destroyOnClose={true}
					footer={null}
					width="auto"
				>
					{state.element}
				</Modal>
			)}
			{props.children}
		</ModalCtx.Provider>
	);
};

function useModalCtx() {
	const context = React.useContext(ModalCtx);
	if (context === undefined) {
		console.log(`useModalCtx must be used within a ModalContext`);
	}
	return context;
}

export { ModalProvider, useModalCtx };
