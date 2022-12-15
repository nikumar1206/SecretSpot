import {
	Collection,
	Entity,
	ManyToOne,
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

	@Property()
	friends = new Collection<User>(this);

	@OneToMany(() => Post, (post) => post.creator)
	posts = new Collection<Post>(this);

	@ManyToOne(() => Post)
	places_attended = new Collection<Post>(this);
}
