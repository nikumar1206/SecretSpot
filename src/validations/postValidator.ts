import { IsString, Length } from "class-validator";

class postValidator {
	@IsString()
	@Length(5, 100)
	name: string;

	@IsString()
	@Length(5, 100)
	location: string;

	@IsString()
	@Length(5, 100)
	caption: string;
}
export default postValidator;
