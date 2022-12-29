import { MikroORM } from "@mikro-orm/core";
import dotenv from "dotenv";
dotenv.config();

import connectRedis from "connect-redis";
import express, { Application } from "express";
import session, { SessionOptions } from "express-session";
import * as redis from "redis";
import { COOKIE_NAME, __prod__ } from "./constants";
import Place from "./entities/Place";
import Post from "./entities/Post";
import User from "./entities/User";
import mikroOrmConfig from "./mikro-orm.config";
import mapsRouter from "./routes/api/maps";
import postRouter from "./routes/api/posts";
import userRouter from "./routes/api/user";
import { DatabaseInterface } from "./types";

export const DI = {} as DatabaseInterface;

const main = async () => {
	const port = process.env.PORT || 5001;
	const app: Application = express();

	const RedisStore = connectRedis(session);
	const redisClient = redis.createClient({ legacyMode: true }); // required to add support for date and int types
	await redisClient.connect();

	const sessOptions: SessionOptions = {
		name: COOKIE_NAME,
		store: new RedisStore({ client: redisClient, disableTouch: true }), //cookie will not refresh after action
		secret: "keyboard cat",
		resave: false, // ensures it doesnt continue to ping redis
		saveUninitialized: true,
		cookie: {
			secure: __prod__, // cookie will only work in prod mode
			maxAge: 1000 * 60 * 60 * 24, // 1 day
			httpOnly: true, // cannot access cookie in js frontend
			sameSite: "lax", // deals with csrf do more googling
		},
	};
	if (app.get("env") === "production") {
		app.set("trust proxy", 1); // trust first proxy
		sessOptions.cookie!.secure = true; // serve secure cookies
	}
	app.use(session(sessOptions));
	app.use(express.json());

	DI.orm = await MikroORM.init(mikroOrmConfig);
	await DI.orm.getMigrator().up(); // run migrations
	DI.em = DI.orm.em.fork();

	DI.userRepository = DI.em.getRepository(User);
	DI.postRepository = DI.em.getRepository(Post);
	DI.placeRepository = DI.em.getRepository(Place);

	app.use("/api/users", userRouter);
	app.use("/api/posts", postRouter);
	app.use("/api/maps", mapsRouter);

	app.listen(port, () => {
		console.log(`🚀 Server is running on port ${port}!`);
	});
};
main();
