import {
	Entity,
	Index,
	OptionalProps,
	PrimaryKey,
	Property,
} from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity({ abstract: true })
export default class Base {
	[OptionalProps]?: "createdAt" | "updatedAt" | "pfpURL"; //  fields will not be required while creating user

	@Index()
	@PrimaryKey({ type: "uuid" })
	id: string = v4();

	@Property()
	createdAt?: Date = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt?: Date = new Date();
}
