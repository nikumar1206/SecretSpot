import { wrap } from "@mikro-orm/core";
import axios from "axios";
import express from "express";
import { DI } from "../../app";
import Post from "../../entities/Post";
import User from "../../entities/User";
const postRouter = express.Router();

postRouter.get("/", async (_, res) => {
	const posts = await DI.postRepository.find({}, { populate: ["attendies"] });
	console.log(posts);

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
	const imageUrl = async () => {
		const baseUrl = "https://www.googleapis.com/customsearch/v1";
		const params = {
			key: process.env.SEARCH_API_KEY,
			cx: process.env.SEARCH_ENGINE_ID,
			q: req.body.name + req.body.location,
			searchType: "image",
		};

		const response = await axios.get(baseUrl, { params });

		return response.data.items[0].link as string;
	};

	const post = new Post();
	wrap(post).assign({
		name: req.body.name,
		location: req.body.location,
		caption: req.body.caption,
		imageUrl: await imageUrl(),
		creator: poster,
	});

	post.attendies.add(poster);

	console.log(post.attendies);

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
