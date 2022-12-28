import {
	Collection,
	Entity,
	ManyToMany,
	ManyToOne,
	Property,
} from "@mikro-orm/core";
import Base from "./Base";
import User from "./User";
import Place from "./Place";

@Entity()
export default class Post extends Base {
	@Property()
	name!: string;

	@Property({ type: "text" })
	caption: string;

	@Property({ default: 0.0, type: "float" })
	lat: number;

	@Property({ default: 0.0, type: "float" })
	lng: number;

	@ManyToOne(() => Place)
	place!: Place;

	@ManyToMany(() => User, (user) => user.places_attended, { owner: true })
	attendies = new Collection<User>(this);

	@ManyToOne(() => User)
	creator: User;
}
