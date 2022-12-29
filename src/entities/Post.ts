import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import Base from "./Base";
import User from "./User";
import Place from "./Place";

@Entity()
export default class Post extends Base {
	@Property({ type: "text" })
	caption: string;

	@Property({ default: 0.0 })
	rating: Number;

	@ManyToOne(() => Place)
	place!: Place;

	@ManyToOne(() => User)
	creator: User;
}
