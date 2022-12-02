import { Entity, Property, Unique } from "@mikro-orm/core";
import Base from "./Base";

@Entity()
export default class Post extends Base {
	@Unique()
	@Property()
	name!: string;

	@Unique()
	@Property()
	location!: string;

	@Property()
	imageUrl: string;

	@Property()
	caption: string;
}
