import { AfterCreate, Entity, ManyToOne, Property } from "@mikro-orm/core";
import Base from "./Base";
import Place from "./Place";
import User from "./User";

@Entity()
export default class Post extends Base {
	@Property({ type: "text" })
	caption: string;

	@Property({ default: 0.0, type: "float8" })
	rating: Number;

	@ManyToOne(() => Place)
	place!: Place;

	@ManyToOne(() => User)
	creator: User;

	@AfterCreate()
	async updateUserFeed() {
		const userFollowers = await this.creator.followers.init({
			populate: ["feed"],
		});

		for (const follower of userFollowers) {
			follower.feed.add(this);
		}
	}
}
