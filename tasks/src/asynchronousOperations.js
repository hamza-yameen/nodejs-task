//Problem 1: Asynchronous Operations
//Create a function that takes in an array of URLs and downloads the contents from each URL using asynchronous methods. Once all downloads are complete, return an array with the downloaded contents in the same order as the URLs.

const axios = require("axios");

const downloadContentHandler = async (apiUrl) => {
	return axios
		.get(apiUrl)
		.then((response) => response.data)
		.catch((error) => {
			console.log("error : ", error);
			return {
				error: `Error downloading content from ${apiUrl}`,
			};
		});
};

const multipleApiCallHandler = async (endpoints) => {
	try {
		const responseArray = [];
		await Promise.all(
			endpoints.map(async (endpoint, index) => {
				const res = await downloadContentHandler(endpoint);
				responseArray[index] = res;
			})
		);
		return await responseArray;
	} catch (error) {
		console.error("An error occurred during API calls:", error);
		throw error;
	}
};

async function main() {
	const urls = [
		"https://dummyjson.com/products/1",
		"https://dummyjson.com/products/2",
		"https://dummyjson.com/products/3",
	];

	const responses = await multipleApiCallHandler(urls);
	console.log("responses : ", responses);
}

main();
