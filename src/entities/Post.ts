import { Entity, ManyToOne, Property, Unique } from "@mikro-orm/core";
import Base from "./Base";
import User from "./User";

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

	@Property()
	attendies: User[];

	@ManyToOne(() => User)
	creator: User;
}
