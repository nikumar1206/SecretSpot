import {
	Collection,
	Entity,
	ManyToMany,
	OneToMany,
	OptionalProps,
	Property,
	Unique,
} from "@mikro-orm/core";
import Base from "./Base";
import Post from "./Post";

@Entity()
export default class User extends Base {
	@Unique()
	@Property()
	username!: string;

	@Property({ hidden: true })
	password_digest!: string;

	@Property({ default: "https://i.imgur.com/yRDb2s7.png" })
	pfpURL!: string;

	@ManyToMany(() => User)
	friends: Collection<User> = new Collection<User>(this);

	@OneToMany(() => Post, (post) => post.creator)
	posts: Collection<Post> = new Collection<Post>(this);

	@ManyToMany(() => Post, (post) => post.attendies)
	places_attended = new Collection<Post>(this);
}
