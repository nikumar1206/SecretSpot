import { MikroORM } from "@mikro-orm/core";
import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import Place from "./entities/Place";
import User from "./entities/User";
import mikroOrmConfig from "./mikro-orm.config";
import userRouter from "./routes/api/user";
import { DatabaseInterface } from "./types";

export const DI = {} as DatabaseInterface;

const main = async () => {
	const port = process.env.PORT || 5001;
	const app: Application = express();
	app.use(express.json());

	DI.orm = await MikroORM.init(mikroOrmConfig);
	await DI.orm.getMigrator().up(); // run migrations
	DI.em = DI.orm.em.fork();
	DI.userRepository = DI.em.getRepository(User);
	DI.placeRepository = DI.em.getRepository(Place);

	app.use("/api/users", userRouter);
	app.listen(port, () => {
		console.log(`🚀 Server is running on port ${port}!`);
	});
};
main();
