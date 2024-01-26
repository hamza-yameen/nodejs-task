export interface IUser {
	id: string;
	userName: string;
	email: string;
	password: string;
	createdAt: any;
	updatedAt: any;
}

export interface IregisterUserResponse {
	id: string;
	userName: string;
	email: string;
	token: string;
	createdAt: any;
}
