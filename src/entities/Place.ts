import {
	Collection,
	Entity,
	OneToMany,
	Property,
	Unique,
} from "@mikro-orm/core";
import Base from "./Base";
import Post from "./Post";

@Entity()
export default class Place extends Base {
	@Unique()
	@Property()
	nameLocation!: string;

	@Property()
	name!: string;

	@Property()
	location!: string;

	@Property({ default: "" })
	imageURL!: string;

	@Property({ default: 0.0, type: "float" })
	lat: number;

	@Property({ default: 0.0, type: "float" })
	lng: number;

	@OneToMany(() => Post, (post) => post.place)
	posts: Collection<Post> = new Collection<Post>(this);
}
