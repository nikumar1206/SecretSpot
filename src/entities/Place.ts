import { Entity, Property, Unique } from "@mikro-orm/core";
import Base from "./Base";

@Entity()
export default class Place extends Base {
	@Unique()
	@Property()
	location!: string;
}
