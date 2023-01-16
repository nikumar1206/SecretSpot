import { wrap } from "@mikro-orm/core";
import express from "express";
import { DI } from "../../app";
import Place from "../../entities/Place";
import Post from "../../entities/Post";
import User from "../../entities/User";
import { findImageURL, findLatLng, separateNameLocation } from "../../utils";
import { postInputValidator } from "../../validations/postValidator";
const postRouter = express.Router();

postRouter.get("/feed", async (req, res) => {
	const currentUser = await DI.userRepository.findOne(
		{
			id: req.session.userId,
		},
		{ populate: ["feed"] }
	);
	if (!currentUser) {
		return res.json({
			errors: "User not found. Please ensured you are logged in.",
			status: 401,
			data: null,
		});
	}
	const posts = (await currentUser.feed.init()).getItems();

	return res.json(posts);
});

postRouter.get("/:id", async (req, res) => {
	const post = await DI.postRepository.find({ id: req.params.id });
	return res.json(post);
});

postRouter.post("/create", async (req, res) => {
	req.body.rating = parseFloat(req.body.rating);
	const saveDataResult = postInputValidator(req.body);
	if (!saveDataResult.success) {
		return res.json({ errors: saveDataResult.errors });
	}

	let poster = (await DI.userRepository.findOne({
		id: req.session.userId,
	})) as User;

	if (!poster) {
		return res.json({
			errors: "User not found. Please ensured you are logged in.",
		});
	}
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
			imageURL: await findImageURL(req.body.place),
		});
		await DI.em.persistAndFlush(newPlace);
		place = await DI.placeRepository.findOne({
			nameLocation: req.body.place,
		});
	}

	const post = new Post();
	wrap(post).assign({
		caption: req.body.caption,
		rating: req.body.rating,
		creator: poster,
		place: place,
	});

	await DI.em.persistAndFlush(post);

	await poster.places_been.init();
	poster.places_been.add(place!);

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
