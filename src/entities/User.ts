import { Collection, Entity, Property, Unique } from "@mikro-orm/core";
import Base from "./Base";

@Entity()
export default class User extends Base {
	@Unique()
	@Property()
	email!: string;

	@Property()
	password_digest!: string;

	@Property()
	friends = new Collection<User>(this);
}
