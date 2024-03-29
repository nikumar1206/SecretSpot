import argon2 from "argon2";
import express from "express";
import { DI } from "../../app";
import { COOKIE_NAME } from "../../constants";
import Post from "../../entities/Post";
import User from "../../entities/User";
import {
	newUserInsert,
	userInputValidator,
} from "../../validations/userValidator";

const userRouter = express.Router();

userRouter.post("/find/", async (req, res) => {
	console.log(req.body);
	const user = await DI.userRepository.findOne(
		{ username: req.body.username },
		{
			populate: ["followers"],
		}
	);
	if (!user) {
		return res.json({
			errors: "User not found",
			data: null,
			status: 401,
		});
	}

	return res.json({
		data: user.followers,
		errors: null,
		status: 200,
	});
});
userRouter.get("/", async (_, res) => {
	const users = await DI.userRepository.find(
		{},
		{ populate: ["following", "followers", "feed"] }
	);
	return res.json({ data: users, errors: null, success: true });
});

userRouter.get("/profile", async (req, res) => {
	const user = await DI.userRepository.findOne(
		{ id: req.session.userId },
		{
			populate: [
				"places_been",
				"following",
				"followers",
				"feed",
				"posts",
				"posts.place",
			],
		}
	);
	if (!user) {
		return res.json({
			errors: "User not found. Please ensured you are logged in.",
			status: 401,
			data: null,
		});
	}
	const placeIDset = new Set();

	const filteredPlacesBeenArr: Post[] = [];
	for (const post of user.posts) {
		if (!placeIDset.has(post.place.id)) {
			placeIDset.add(post.place.id);
			filteredPlacesBeenArr.push(post);
		}
	}

	const top5Spots = filteredPlacesBeenArr
		.sort((a, b) => {
			if (a.rating > b.rating) {
				return -1;
			}
			if (a.rating < b.rating) {
				return 1;
			}
			return 0;
		})
		.slice(0, 5);
	return res.json({
		errors: null,
		data: { ...user, top5Spots },
		status: "success",
	});
});

userRouter.get("/lists", async (req, res) => {
	const user = await DI.userRepository.findOne(
		{ id: req.session.userId },
		{
			populate: [
				"places_been.id",
				"places_to_go",
				"recs",
				"posts",
				"posts.place",
			],
		}
	);
	if (!user) {
		return res.json({
			errors: "User not found. Please ensured you are logged in.",
			status: 401,
			data: null,
		});
	}
	const placeIDset = new Set();

	const filteredPlacesBeenArr: Post[] = [];
	for (const post of user.posts) {
		if (!placeIDset.has(post.place.id)) {
			placeIDset.add(post.place.id);
			filteredPlacesBeenArr.push(post);
		}
	}

	return res.json({
		places_been: filteredPlacesBeenArr,
		bookmarks: user.bookmarks,
		recs: user.recs,
	});
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

	const user = await DI.em.findOne(
		User,
		{ username: req.body.username },
		{ populate: ["places_been", "following", "followers", "feed"] }
	);
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

	return res.json({ data: user, errors: null, success: true });
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

userRouter.patch("/:id", async (req, res) => {
	const [user, checkUserinDB] = await Promise.all([
		DI.userRepository.findOne({ id: req.params.id }, { populate: ["posts"] }),
		DI.userRepository.findOne(
			{
				username: req.body.username,
			},
			{ populate: ["posts"] }
		),
	]);

	if (!user) {
		return res.json({
			errors: "User not found. Please ensured you are logged in.",
			status: 401,
			data: null,
		});
	}

	if (checkUserinDB && checkUserinDB.id !== user.id) {
		return res.json({
			errors: [
				{
					field: "username",
					message: "Username already exists!",
				},
			],
			status: 401,
			data: null,
		});
	}

	user.username = req.body.username;
	user.favorite_cuisine = req.body.favorite_cuisine;

	await DI.em.flush();
	return res.json({
		data: user,
		errors: null,
		success: true,
	});
});

userRouter.post("/follow/:username", async (req, res) => {
	const [newFollower, currentUser] = await Promise.all([
		DI.userRepository.findOne(
			{ username: req.params.username },
			{ populate: ["followers"] }
		),
		DI.userRepository.findOne(
			{ id: req.session.userId },
			{ populate: ["following"] }
		),
	]);

	if (!newFollower) {
		return res.json({
			errors: [
				{
					field: "username",
					message: "Username does not exist!",
				},
			],
		});
	}

	if (!currentUser) {
		return res.json({
			errors: [
				{
					field: "username",
					message: "Username does not exist!",
				},
			],
		});
	}
	if (currentUser.username === newFollower.username) {
		return res.json({
			success: false,
			data: null,
			errors: [
				{
					field: "username",
					message: "You cannot follow yourself!",
				},
			],
		});
	}

	if (currentUser.following.contains(newFollower)) {
		return res.json({
			success: false,
			data: null,
			errors: [
				{
					field: "username",
					message: "You are already following this user!",
				},
			],
		});
	}
	currentUser.following.add(newFollower);
	newFollower.followers.add(currentUser);
	await DI.em.flush();
	return res.json({ success: true, errors: null, data: newFollower });
});

userRouter.post("/unfollow/:username", async (req, res) => {
	const [unfollowUser, currentUser] = await Promise.all([
		DI.userRepository.findOne(
			{ username: req.params.username },
			{ populate: ["followers"] }
		),
		DI.userRepository.findOne(
			{ id: req.session.userId },
			{ populate: ["following"] }
		),
	]);

	if (!unfollowUser) {
		return res.json({
			errors: [
				{
					field: "username",
					message: "Username does not exist!",
				},
			],
		});
	}

	if (!currentUser) {
		return res.json({
			errors: [
				{
					field: "username",
					message: "Username does not exist!",
				},
			],
		});
	}
	if (currentUser.username === unfollowUser.username) {
		return res.json({
			success: false,
			data: null,
			errors: [
				{
					field: "username",
					message: "You cannot unfollow yourself!",
				},
			],
		});
	}

	if (!currentUser.following.contains(unfollowUser)) {
		return res.json({
			success: false,
			data: null,
			errors: [
				{
					field: "username",
					message: "You are not following this user!",
				},
			],
		});
	}
	currentUser.following.remove(unfollowUser);
	unfollowUser.followers.remove(currentUser);
	await DI.em.flush();
	return res.json({ success: true, errors: null, data: unfollowUser });
});
export default userRouter;
