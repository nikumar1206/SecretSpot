import { Collection, Entity, ManyToOne, Property } from "@mikro-orm/core";
import Base from "./Base";
import User from "./User";

@Entity()
export default class Post extends Base {
	@Property()
	name!: string;

	@Property()
	location!: string;

	@Property({ default: "" })
	imageUrl!: string;

	@Property()
	caption: string;

	@Property({ type: User })
	attendies = new Collection<User>(this);

	@ManyToOne(() => User)
	creator: User;
}
