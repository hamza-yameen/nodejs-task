import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import { BadRequestException } from "./libs/httpExceptionSchema";
import ResponseMessages from "./libs/errorMessages";
import { apiResponseHandler } from "./helpers/apiResponseUtils";
import { error } from "console";

// app configuration
const app: Express = express();
dotenv.config();
const port: string | number = process.env.NODE_SERVER_PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Expose-Headers", "Content-Length");
	next();
});

app.get("/", (req: Request, res: Response) => {
	res.status(200).json(
		apiResponseHandler(200, {
			message: "Welcome to NodeJS+Express API's.",
		})
	);
});

// routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/posts", require("./routes/postRoute"));

app.use((req: Request, res: Response, next: NextFunction) => {
	const error: any = new BadRequestException(ResponseMessages.NO_ROUTE_FOUND);
	throw error;
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	if (res.headersSent) {
		return next(error);
	}

	res.status(error.code || 500).json(
		apiResponseHandler(error.code || 500, {
			error: error.message || "An unknown error occurred!",
		})
	);
});

app.listen(port, () => {
	return console.log(`App is listening at http://localhost:${port}`);
});
