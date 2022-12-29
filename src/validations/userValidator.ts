import { z } from "zod";
import { DI } from "../app";
import User from "../entities/User";

export const userInput = z.object({
	username: z
		.string()
		.trim()
		.min(3, {
			message: "Username must be at least 3 characters long",
		})
		.max(255, {
			message: "Username must be less than 255 characters long",
		}),
	password: z
		.string()
		.min(3, {
			message: "Password must be at least 3 characters long",
		})
		.max(255, {
			message: "Password must be less than 255 characters long",
		}),
});

export const userInputValidator = (rawData: any) => {
	try {
		userInput.parse(rawData);
		return { success: true, errors: null };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { success: false, errors: error.errors };
		} else {
			return { success: false, errors: error };
		}
	}
};

export const newUserInsert = async (user: User) => {
	try {
		await DI.em.persistAndFlush(user);
		return { success: true, errors: null };
	} catch (error) {
		if (error.code === "23505") {
			return {
				success: false,
				errors: [
					{
						field: "username",
						message: "This username has already been taken.",
					},
				],
			};
		} else {
			return {
				success: false,
				errors: {
					field: "unknown",
					message: "Something went wrong. Please try again later.",
				},
			};
		}
	}
};
