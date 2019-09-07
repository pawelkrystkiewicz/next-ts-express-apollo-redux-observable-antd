export interface AppStateModel {
	accounts?: Array<Accounts>;
	categories?: Array<Categories>;
	projects?: Array<Projects>;
	repeatPatterns?: Array<RepeatPatterns>;
}

export interface Accounts {
	name: string;
	number?: number;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Categories {
	name: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Projects {
	name: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface RepeatPatterns {
	name?: string;
	amount?: number;
	type?: string;
	startAt?: Date;
	endAt?: Date | null;
	createdAt?: Date;
	updatedAt?: Date;
}