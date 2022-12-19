import { IsEmail, IsString, Length } from "class-validator";

class UserValidator {
	@IsEmail({}, { message: "Must be a valid email address" })
	email: string;

	@IsString()
	@Length(7, 50, { message: "Password must be between 7 and 50 characters" })
	password_digest: string;
}
export default UserValidator;
