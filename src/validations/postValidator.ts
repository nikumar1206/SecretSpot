import { z } from "zod";

const postInput = z.object({
	title: z
		.string()
		.min(3, { message: "Title must be at least 3 characters long" })
		.max(255, { message: "Title must be less than 255 characters long" }),
	caption: z
		.string()
		.min(3, { message: "Body must be at least 3 characters long" }),
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
