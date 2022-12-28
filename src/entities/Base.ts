import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity({ abstract: true })
export default class Base {
	[OptionalProps]?: "createdAt" | "updatedAt" | "pfpURL"; //  fields will not be required while creating user

	@PrimaryKey({ type: "uuid" })
	id: string = v4();

	@Property({ hidden: true })
	createdAt?: Date = new Date();

	@Property({ onUpdate: () => new Date(), hidden: true })
	updatedAt?: Date = new Date();
}
