import jwt, { JwtPayload } from "jsonwebtoken";

export const signJWT = async (payload: object) => {
	return await jwt.sign(payload, process.env.JWT_SECRET as string, {
		algorithm: "HS256",
		expiresIn: "1h",
	});
};

// verify jwt
export const verifyJWT = async (token: string) => {
	try {
		const decoded: any = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as JwtPayload;

		const currentTime = Math.floor(Date.now() / 1000);
		if (decoded.exp <= currentTime) {
			return { payload: null, expired: true };
		}
		return { payload: decoded, expired: false };
	} catch (error) {
		return { payload: null, expired: true };
	}
};
