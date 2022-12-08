import express from "express";
import { DI } from "../../app";
import argon2 from "argon2";
import User from "../../entities/User";
import { COOKIE_NAME } from "../../constants";
const userRouter = express.Router();

userRouter.get("/", async (_, res) => {
	const users = await DI.userRepository.find({});
	return res.json(users);
});

userRouter.get("/authed", async (req, res) => {
	const user = await DI.userRepository.findOne({ id: req.session.userId });
	console.log(!!user);
	return res.json(!!user);
});

userRouter.post("/register", async (req, res) => {
	const hashedPassword = await argon2.hash(req.body.password);
	const user: User = DI.em.create(User, {
		email: req.body.email,
		password_digest: hashedPassword,
	});
	try {
		await DI.em.persistAndFlush(user);
	} catch (error) {
		if (error.code === "23505") {
			return res.json({
				errors: [
					{
						field: "email",
						message: "This email has already been taken.",
					},
				],
			});
		} else {
			return res.json({ error });
		}
	}
	req.session.userId = user.id;
	return res.json(user);
});

userRouter.post("/login", async (req, res) => {
	const user = await DI.em.findOne(User, { email: req.body.email });
	if (!user) {
		return res.json({
			errors: [
				{
					field: "email",
					message: "Email does not exist!",
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

	req.session!.userId = user.id; // exclamation mark ensures that it is defined
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
