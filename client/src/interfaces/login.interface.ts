export interface loginInput {
	email: string;
	password: string;
}

export interface loginResponse {
	token: string;
	user: {
		userName: string;
		email: string;
	};
}

export interface registerInput {
	userName: string;
	email: string;
	password: string;
	confirmPassword: string;
}
