import { wrap } from "@mikro-orm/core";
import express from "express";
import { DI } from "../../app";
import Post from "../../entities/Post";
import User from "../../entities/User";
import Place from "../../entities/Place";
import { findImageUrl, findLatLng, separateNameLocation } from "../../utils";
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
	let poster = (await DI.userRepository.findOne({
		id: req.session.userId,
	})) as User;

	let place = await DI.placeRepository.findOne({
		nameLocation: req.body.place,
	});
	if (!place) {
		const { name, location } = separateNameLocation(req.body.place);
		const { lat, lng } = await findLatLng(req);

		let newPlace = DI.em.create(Place, {
			nameLocation: req.body.place,
			name: name,
			location: location,
			lat: lat,
			lng: lng,
			imageUrl: await findImageUrl(req.body.place),
		});
		await DI.em.persistAndFlush(newPlace);
	}

	place = await DI.placeRepository.findOne({
		nameLocation: req.body.place,
	});

	const post = new Post();
	wrap(post).assign({
		caption: req.body.caption,
		creator: poster,
		place: place,
	});

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
