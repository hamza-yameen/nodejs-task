//Problem 2: Error Handling
//Design a function that fetches data from an API endpoint. Implement proper error handling to handle various HTTP status codes and network failures. Log appropriate messages for each type of error encountered.

const axios = require("axios");

async function axiosHandler(apiUrl, data) {
	try {
		const response = await axios.post(apiUrl, data);
		return response.data;
	} catch (error) {
		return error?.response?.data;
	}
}

// localhost Url and Dummuy Data
const apiUrl = "http://localhost:8000/api/auth/register";
const data1 = {
	userName: "Jack",
	email: "jack1122@gmail.com",
	password: "password1122",
};
const data2 = {
	userName: null,
	email: "jack1122@gmail.com",
	password: "password1122",
};

axiosHandler(apiUrl, data1)
	.then((response) => {
		if (response?.statusCode == 200) {
			console.log("User saved successfully : ", response?.data);
		} else {
			console.log("Failed to save user : ", response?.data);
		}
	})
	.catch((error) => {
		console.error("An unexpected error occurred:", error);
	});
