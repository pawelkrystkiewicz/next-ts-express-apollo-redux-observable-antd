import React, { useState } from 'react';

const AppState = React.createContext(undefined);

import { AppStateModel } from './state.d';

const AppStateProvider = (props) => {
	const [ state, setState ] = useState();

	const updateState = (data: AppStateModel) => {
		console.log(data);
	};

	return (
		<AppState.Provider
			value={{
				state
			}}
			{...props}
		>
			{props.children}
		</AppState.Provider>
	);
};

function useAppState() {
	const context = React.useContext(AppState);
	if (context === undefined) {
		console.log(`useAppState must be used within a AppState`);
	}
	return context;
}

export { AppStateProvider, useAppState };
