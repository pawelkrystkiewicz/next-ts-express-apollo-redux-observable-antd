export default {
	prod: process.env.NODE_ENV === 'production',
	formats: {
		date: `DD.MM.YYYY`,
		time: `HH:mm`,
		dateTime: `DD.MM.YYYY HH:mm`
	},
	apollo: {
		queryErrorText: `Brak połączenia`,
		queryEmptyText: `Brak danych`,
		authPollingInterval: 3000,
		uri: process.env.REACT_APP_AUTH
	}
};
