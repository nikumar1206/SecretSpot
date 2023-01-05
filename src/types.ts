import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/core";
import Place from "./entities/Place";
import Post from "./entities/Post";
import User from "./entities/User";

export interface DatabaseInterface {
	orm: MikroORM;
	em: EntityManager;
	userRepository: EntityRepository<User>;
	postRepository: EntityRepository<Post>;
	placeRepository: EntityRepository<Place>;
}

declare module "express-session" {
	// allows SessionData to include userId or else we would get typeError
	interface SessionData {
		userId: string;
	}
}

export interface unCleanUser {
	id: string;
	username: string;
	password_digest?: string;
	friends: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface UserInput {
	username: string;
	password: string;
}
