import { EventSubscriber, Subscriber } from "@mikro-orm/core";
import Post from "../entities/Post";

@Subscriber()
export class PostSubscriber implements EventSubscriber<Post> {
	async afterCreate() {
		console.log("afterCreate");
	}
}

export default PostSubscriber;
