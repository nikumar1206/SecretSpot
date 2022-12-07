import path from "path";
import { MikroORM } from "@mikro-orm/core";
import User from "./entities/User";
import Base from "./entities/Base";
import Post from "./entities/Post";

export default {
	migrations: {
		path: path.join(__dirname, "migrations"),
		pathTs: path.join(path.resolve(), "src", "migrations"),
		glob: "!(*.d).{js,ts}", // match migration files (all .js and .ts files, but not .d.ts)
	},
	entities: [User, Base, Post],
	dbName: "secret_spot",
	type: "postgresql",
	debug: true,
	snapshot: false,
} as Parameters<typeof MikroORM.init>[0];
