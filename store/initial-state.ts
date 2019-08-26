import routes from '../routes';

export default {
	user: {
		email: null,
		password: null,
		name: null,
		__typename: 'User'
	},
	settings: {
		redirects: {
			onLogin: routes.dashboard,
			onLogout: routes.index
		},
		__typename: 'Settings'
	},
	pages: {
		dashboard: {
			defaultAccountInTable: `all`
		},
		user: {
			defaultTab: 'User Settings'
		}
	}
};
