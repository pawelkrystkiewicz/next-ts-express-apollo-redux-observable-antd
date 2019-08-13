import * as redux from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import reducer from './reducer';
import { rootEpic } from './epics';

const { createStore, applyMiddleware } = redux;

export default function initStore(initialState) {
	const epicMiddleware = createEpicMiddleware();
	const logger = createLogger({ collapsed: true }); // log every action to see what's happening behind the scenes.
	const reduxMiddleware = applyMiddleware(epicMiddleware, logger);

	const store = createStore(reducer, initialState, reduxMiddleware);
	epicMiddleware.run(rootEpic);

	return store;
}
