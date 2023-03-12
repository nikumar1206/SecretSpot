import { wrap } from "@mikro-orm/core";
import express from "express";
import { DI } from "../../app";
import Place from "../../entities/Place";
import Post from "../../entities/Post";
import { postInputValidator } from "../../validations/postValidator";
const postRouter = express.Router();

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
	req.body.post.rating = parseFloat(req.body.post.rating);
	const saveDataResult = postInputValidator(req.body.post);
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
			nameLocation:
				req.body.place.place_name + " " + req.body.place.place_address,
		}),
	]);

	if (!poster) {
		return res.json({
			errors: "User not found. Please ensured you are logged in.",
		});
	}

	if (!place) {
		// const [latlongObj, imageURL] = await Promise.all([
		// 	findLatLng(req),
		// 	findImageURL(req.body.place),
		// ]);
		// const { name, location } = separateNameLocation(req.body.place);

		let newPlace = DI.em.create(Place, {
			nameLocation:
				req.body.place.place_name + " " + req.body.place.place_address,
			name: req.body.place.place_name,
			location: req.body.place.place_address,
			lat: req.body.place.place_lat,
			lng: req.body.place.place_lng,
			imageURL: req.body.place.photo_link,
		});
		await DI.em.persistAndFlush(newPlace);
		place = await DI.placeRepository.findOne({
			nameLocation:
				req.body.place.place_name + " " + req.body.place.place_address,
		});
	}

	const post = new Post();
	wrap(post).assign({
		caption: req.body.post.caption,
		rating: req.body.post.rating,
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
