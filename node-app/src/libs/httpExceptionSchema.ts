class HttpException extends Error {
	code: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.code = statusCode;
	}
}

class NotFoundException extends HttpException {
	constructor(message: string = "errors.not_found") {
		super(message, 404);
	}
}

class UnAuthorizedException extends HttpException {
	constructor(message: string = "errors.unauthorized") {
		super(message, 401);
	}
}

class BadRequestException extends HttpException {
	constructor(message: string = "errors.bad_request") {
		super(message, 400);
	}
}

class ForbiddenException extends HttpException {
	constructor(message: string = "errors.forbidden") {
		super(message, 403);
	}
}

class FatalErrorException extends HttpException {
	constructor(message: string = "errors.fatal") {
		super(message, 500);
	}
}

class UnprocessableEntityException extends HttpException {
	constructor(message: string = "errors.unprocessable_entity") {
		super(message, 422);
	}
}

export {
	NotFoundException,
	UnAuthorizedException,
	BadRequestException,
	ForbiddenException,
	FatalErrorException,
	UnprocessableEntityException,
};
