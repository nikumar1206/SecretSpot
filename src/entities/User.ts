import {
	Collection,
	Entity,
	ManyToMany,
	OneToMany,
	Property,
	Unique,
} from "@mikro-orm/core";
import Base from "./Base";
import Post from "./Post";

@Entity()
export default class User extends Base {
	@Unique()
	@Property()
	email!: string;

	@Property()
	password_digest!: string;

	@ManyToMany(() => User)
	friends: Collection<User> = new Collection<User>(this);

	@OneToMany(() => Post, (post) => post.creator)
	posts = new Collection<Post>(this);

	@ManyToMany(() => Post, (post) => post.attendies)
	places_attended = new Collection<Post>(this);
}
