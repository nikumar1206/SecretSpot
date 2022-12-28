import { Entity, Property, Unique } from "@mikro-orm/core";
import Base from "./Base";

@Entity()
export default class Place extends Base {
	@Unique()
	@Property()
	name!: string;

	@Property({ hidden: true })
	location!: string;

	@Property({ default: "" })
	imageUrl!: string;

	@Property({ default: "https://i.imgur.com/yRDb2s7.png" })
	pfpURL!: string;

	@ManyToMany(() => User)
	friends: Collection<User> = new Collection<User>(this);

	@OneToMany(() => Post, (post) => post.creator)
	posts: Collection<Post> = new Collection<Post>(this);

	@ManyToMany(() => Post, (post) => post.attendies)
	places_attended = new Collection<Post>(this);
}
