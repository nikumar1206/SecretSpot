import { wrap } from "@mikro-orm/core";
import express from "express";
import { DI } from "../../app";
import Place from "../../entities/Place";
import Post from "../../entities/Post";
import { findImageURL, findLatLng, separateNameLocation } from "../../utils";
import { postInputValidator } from "../../validations/postValidator";
const postRouter = express.Router();
// type newPost =
// 	Loaded<Post, "place" | "creator">[] | "bookmarmed" : boolean

postRouter.get("/", async (req, res) => {
	const user = await DI.userRepository.findOne(
		{ id: req.session.userId },
		{ populate: ["places_been"] }
	);
	return res.json(user?.places_been);
});

postRouter.get("/feed", async (req, res) => {
	const currentUser = await DI.userRepository.findOne(
		{
			id: req.session.userId,
		},
		{ populate: ["feed", "feed.place", "feed.creator", "bookmarks"] }
	);
	if (!currentUser) {
		return res.json({
			errors: "User not found. Please ensured you are logged in.",
			status: 401,
			data: null,
		});
	}

	const posts = await currentUser.feed.matching({
		limit: 20,
		offset: 0,
		orderBy: { createdAt: "DESC" },
		populate: ["place", "creator"],
	});
	const handleBookmarked = (post: Post) => {
		const bookmarked = currentUser.bookmarks.contains(post.place);
		const updatedPost = { ...post, bookmarked: bookmarked };
		return updatedPost;
	};

	const updatedPosts = posts.map((post) => {
		return handleBookmarked(post);
	});

	return res.json(updatedPosts);
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

	let [poster, place] = await Promise.all([
		DI.userRepository.findOne(
			{
				id: req.session.userId,
			},
			{ populate: ["places_been", "bookmarks"] }
		),
		DI.placeRepository.findOne({
			nameLocation: req.body.place,
		}),
	]);

	if (!poster) {
		return res.json({
			errors: "User not found. Please ensured you are logged in.",
		});
	}

	if (!place) {
		const [latlongObj, imageURL] = await Promise.all([
			findLatLng(req),
			findImageURL(req.body.place),
		]);
		const { name, location } = separateNameLocation(req.body.place);

		let newPlace = DI.em.create(Place, {
			nameLocation: req.body.place,
			name: name,
			location: location,
			lat: latlongObj.lat,
			lng: latlongObj.lng,
			imageURL: imageURL,
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

	if (!poster.places_been.contains(place!)) {
		poster.places_been.add(place!);
	}
	if (poster.bookmarks.contains(place!)) {
		poster.bookmarks.remove(place!);
	}
	await DI.em.flush();
	return res.json(post);
});

postRouter.patch("/:id/edit", async (req, res) => {
	const post = await DI.postRepository.findOne(req.params.id);
	await DI.em.persistAndFlush(post!);
	return res.json(post);
});

postRouter.delete("/:id", async (req, res) => {
	const [currentUser, post] = await Promise.all([
		DI.userRepository.findOne(
			{
				id: req.session.userId,
			},
			{ populate: ["feed"] }
		),
		DI.postRepository.findOne(req.params.id),
	]);
	currentUser?.feed.remove(post!);
	await DI.em.flush();
	return res.json(post);
});

postRouter.post("/bookmark/:placeId", async (req, res) => {
	const placeId = req.params.placeId;
	const [place, currentUser] = await Promise.all([
		DI.placeRepository.findOne({ id: placeId }),
		DI.userRepository.findOne(
			{
				id: req.session.userId,
			},
			{ populate: ["bookmarks"] }
		),
	]);
	currentUser?.bookmarks.add(place!);
	return res.json(place);
});

postRouter.delete("/bookmark/:placeId", async (req, res) => {
	const placeId = req.params.placeId;
	const [place, currentUser] = await Promise.all([
		DI.placeRepository.findOne({ id: placeId }),
		DI.userRepository.findOne(
			{
				id: req.session.userId,
			},

			{ populate: ["bookmarks"] }
		),
	]);

	currentUser?.bookmarks.remove(place!);
	return res.json(place);
});

export default postRouter;
