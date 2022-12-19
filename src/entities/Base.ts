import {
	BaseEntity,
	OptionalProps,
	PrimaryKey,
	Property,
} from "@mikro-orm/core";
import { v4 } from "uuid";

export default class Base<T extends { id: string }> extends BaseEntity<
	T,
	"id"
> {
	[OptionalProps]?: "createdAt" | "updatedAt"; //  fields will not be required while creating user

	@PrimaryKey({ type: "uuid" })
	id: string = v4();

	@Property()
	createdAt?: Date = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt?: Date = new Date();

	constructor(body = {}) {
		super();
		this.assign(body);
	}
}
