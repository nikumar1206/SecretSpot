import express from "express";
import { DI } from "../../app";
import Place from "../../entities/Place";

const placeRouter = express.Router();

placeRouter.get("/", async (_, res) => {
	const places = await DI.placeRepository.find(
		{},
		{ orderBy: { name: "ASC" } }
	);
	return res.json(places);
});

placeRouter.post("/search/", async (req, res) => {
	let place = await DI.placeRepository.findOne({
		nameLocation: req.body.place_name + " " + req.body.place_address,
	});

	if (!place) {
		const createdPlace = DI.em.create(Place, {
			nameLocation: req.body.place_name + " " + req.body.place_address,
			name: req.body.place_name,
			location: req.body.place_address,
			lat: req.body.place_lat,
			lng: req.body.place_lng,
			imageURL: req.body.photo_link,
		});
		await DI.em.persistAndFlush(createdPlace);
		place = await DI.placeRepository.findOne({
			nameLocation: req.body.place_name + " " + req.body.place_address,
		});
		return res.json(createdPlace);
	}

	return res.json(place);
});

placeRouter.get("/:id", async (req, res) => {
	const place = await DI.placeRepository.findOne({ id: req.params.id });
	return res.json(place);
});

export default placeRouter;
