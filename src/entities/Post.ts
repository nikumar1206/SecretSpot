import {
	Collection,
	Entity,
	ManyToMany,
	ManyToOne,
	Property,
} from "@mikro-orm/core";
import Base from "./Base";
import User from "./User";

@Entity()
export default class Post extends Base<Post> {
	@Property()
	name!: string;

	@Property()
	location!: string;

	@Property({ default: "" })
	imageUrl!: string;

	@Property()
	caption: string;

	@Property({ default: 0 })
	lat: number;

	@Property({ default: 0 })
	lng: number;

	@ManyToMany(() => User, (user) => user.places_attended, { owner: true })
	attendies = new Collection<User>(this);

	@ManyToOne(() => User)
	creator: User;
}
