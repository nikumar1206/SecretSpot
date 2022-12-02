import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/core";
import Place from "./entities/Post";
import User from "./entities/User";

export interface DatabaseInterface {
	orm: MikroORM;
	em: EntityManager;
	userRepository: EntityRepository<User>;
	placeRepository: EntityRepository<Place>;
}

declare module "express-session" {
	// allows SessionData to include userId or else we would get typeError
	interface SessionData {
		userId: string;
	}
}
