import { IapiResponseHandler } from "../interfaces/apiResponse";

export const apiResponseHandler = (
	statusCode: number,
	data: any
): IapiResponseHandler => {
	return {
		statusCode: statusCode,
		data: data,
	};
};
