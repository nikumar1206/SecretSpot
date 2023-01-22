import express from "express";
import { DI } from "../../app";
import { findImageURL, findLatLng, separateNameLocation } from "../../utils";

const placeRouter = express.Router();

placeRouter.get("/", async (_, res) => {
	const places = await DI.placeRepository.find(
		{},
		{ orderBy: { name: "ASC" } }
	);
	return res.json(places);
});

placeRouter.get("/:id", async (req, res) => {
	const place = await DI.placeRepository.findOne({ id: req.params.id });
	return res.json(place);
});

placeRouter.get("/search/:namelocation", async (req, res) => {
	const place = await DI.placeRepository.findOne({
		nameLocation: req.params.namelocation,
	});

	if (!place) {
		const { name, location } = separateNameLocation(req.params.namelocation);
		const { lat, lng } = await findLatLng(req);
		const createdPlace = DI.placeRepository.create({
			nameLocation: req.params.namelocation,
			lat: lat,
			lng: lng,
			imageURL: await findImageURL(req.params.namelocation),
			name: name,
			location: location,
		});
		await DI.placeRepository.persistAndFlush(createdPlace);
		return res.json(createdPlace);
	}

	return res.json(place);
});

export default placeRouter;
