import { wrap } from "@mikro-orm/core";
import express from "express";
import { DI } from "../../app";
import Post from "../../entities/Post";
import User from "../../entities/User";
import { findImageUrl, findLatLng, separateNameLocation } from "../../utils";
const postRouter = express.Router();

postRouter.get("/", async (_, res) => {
	const posts = await DI.postRepository.find({}, { populate: ["attendies"] });
	return res.json(posts);
});

postRouter.get("/:id", async (req, res) => {
	const post = await DI.postRepository.find({ id: req.params.id });
	return res.json(post);
});

postRouter.post("/create", async (req, res) => {
	let poster = (await DI.userRepository.findOne({
		id: req.session.userId,
	})) as User;
	console.log(req.body);

	const { name, location } = separateNameLocation(req.body.nameLocation);
	const { lat, lng } = await findLatLng(req);

	const post = new Post();

	wrap(post).assign({
		name: name,
		location: location,
		caption: req.body.caption,
		imageUrl: await findImageUrl(req),
		creator: poster,
		lat: lat,
		lng: lng,
	});

	post.attendies.add(poster);
	await DI.em.persistAndFlush(post);
	return res.json(post);
});

postRouter.patch("/:id/edit", async (req, res) => {
	const post = await DI.postRepository.findOne(req.params.id);
	await DI.em.persistAndFlush(post!);
	return res.json(post);
});

postRouter.delete("/:id", async (req, res) => {
	const post = await DI.postRepository.findOne(req.params.id);
	await DI.em.removeAndFlush(post!);
	return post ? res.json(true) : res.json(false);
});

export default postRouter;
