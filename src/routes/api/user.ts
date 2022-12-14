import argon2 from "argon2";
import express from "express";
import { DI } from "../../app";
import { COOKIE_NAME } from "../../constants";
import User from "../../entities/User";
import {
	newUserInsert,
	userInputValidator,
} from "../../validations/userValidator";

const userRouter = express.Router();

userRouter.get("/", async (_, res) => {
	const users = await DI.userRepository.find(
		{},
		{ populate: ["following", "followers"] }
	);
	return res.json({ data: users, errors: null, success: true });
});

userRouter.get("/user", async (req, res) => {
	const user = await DI.userRepository.findOne(
		{ id: req.session.userId },
		{
			populate: ["places_been"],
		}
	);
	return res.json(user);
});
userRouter.post("/register", async (req, res) => {
	const saveDataResult = userInputValidator(req.body);
	if (!saveDataResult.success) {
		return res.json({ errors: saveDataResult.errors });
	}
	const hashedPassword = await argon2.hash(req.body.password);
	const user: User = DI.em.create(User, {
		username: req.body.username,
		password_digest: hashedPassword,
		favorite_cuisine: "Italian",
	});
	const DBInsert = await newUserInsert(user);
	if (!DBInsert.success) {
		return res.json(DBInsert);
	}

	req.session.userId = user.id;
	return res.json(user);
});

userRouter.post("/login", async (req, res) => {
	const saveDataResult = userInputValidator(req.body);
	if (!saveDataResult.success) {
		return res.json({ errors: saveDataResult.errors });
	}

	const user = await DI.em.findOne(User, { username: req.body.username });
	if (!user) {
		return res.json({
			errors: [
				{
					field: "username",
					message: "Username does not exist!",
				},
			],
		});
	}
	const validPassword = await argon2.verify(
		user.password_digest,
		req.body.password
	);
	if (!validPassword) {
		return res.json({
			errors: [
				{
					field: "password",
					message: "Sorry, that password is not correct!",
				},
			],
		});
	}

	req.session.userId = user.id; // exclamation mark ensures that it is defined
	// gets stored in redis
	// send cookie into browser
	// when request is made, goes to server
	// gets the session key, sends to redis
	// redis sends back the user id

	return res.json(user);
});

userRouter.post("/logout", async (req, res) => {
	const deleteCookie = await new Promise((resolve) =>
		req.session.destroy((err) => {
			res.clearCookie(COOKIE_NAME);
			if (err) {
				resolve(false);
				return;
			}
			resolve(true);
		})
	);
	return res.json(deleteCookie);
});

export default userRouter;
