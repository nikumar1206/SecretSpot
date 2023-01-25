import { z } from "zod";

const postInput = z.object({
	place: z
		.string()
		.min(3, { message: "Location name must be at least 3 characters long" })
		.max(255, {
			message: "Location name must be less than 255 characters long",
		}),
	rating: z
		.number({
			required_error: "Rating is required",
			invalid_type_error: "Please provide a rating between 0 and 10",
		})
		.min(0, { message: "Rating must be at least 0" })
		.max(10, {
			message: "Rating must be less than 10",
		}),
	caption: z
		.string()
		.trim()
		.min(3, { message: "Caption must be at least 3 characters long" })
		.max(255, { message: "Caption must be less than 255 characters long" }),
});

export const postInputValidator = (rawData: any) => {
	try {
		postInput.parse(rawData);
		return { success: true, errors: null };
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { success: false, errors: error.errors };
		} else {
			return { success: false, errors: error };
		}
	}
};
