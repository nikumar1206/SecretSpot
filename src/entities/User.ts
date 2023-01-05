import {
	Collection,
	Entity,
	ManyToMany,
	OneToMany,
	Property,
	Unique,
} from "@mikro-orm/core";
import Base from "./Base";
import Place from "./Place";
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

	@Property({ default: "", nullable: true })
	favorite_cuisine!: string;

	@ManyToMany(() => User)
	followers: Collection<User> = new Collection<User>(this);

	@ManyToMany(() => User)
	following: Collection<User> = new Collection<User>(this);

	@OneToMany(() => Post, (post) => post.creator)
	posts: Collection<Post> = new Collection<Post>(this);

	@ManyToMany(() => Place)
	places_been: Collection<Place> = new Collection<Place>(this);

	@ManyToMany(() => Place)
	places_to_go: Collection<Place> = new Collection<Place>(this);

	@ManyToMany(() => Place)
	recs: Collection<Place> = new Collection<Place>(this);
}
