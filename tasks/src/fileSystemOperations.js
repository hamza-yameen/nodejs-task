//Problem 3: File System Operations
//Develop a utility that reads a directory and lists all files with a specific extension (e.g., .txt). Implement this functionality using Node.js's File System module.

const fs = require("fs");
const path = require("path");

function fileSystemOperations() {
	const extension = "txt";
	const projectRoot = path.resolve(__dirname);
	const filesDirectory = path.join(projectRoot, "files");

	fs.readdir(filesDirectory, (error, files) => {
		if (error) {
			console.log("Error reading directory:", error);
			return;
		}

		const filteredFiles = files.filter(
			(file) => path.extname(file) === `.${extension}`
		);

		if (filteredFiles.length > 0) {
			filteredFiles.forEach((file) => {
				console.log(file);
			});
		} else {
			console.log(
				`No files with extension .${extension} found in the directory.`
			);
		}
	});
}

fileSystemOperations();
