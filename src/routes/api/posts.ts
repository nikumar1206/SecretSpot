import express from "express";
import { DI } from "../../app";
const postRouter = express.Router();

postRouter.get("/", async (_, res) => {
	const posts = await DI.postRepository.find({});
	return res.json(posts);
});

postRouter.get("/:id", async (req, res) => {
	const post = await DI.postRepository.find({ id: req.params.id });
	return res.json(post);
});
postRouter.post("/create", async (req, res) => {
	const post = DI.postRepository.create(req.body);
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
