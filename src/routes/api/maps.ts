import express from "express";
const mapsRouter = express.Router();

mapsRouter.get("/", async (_, res) => {
	return res.json(process.env.GOOGLE_API_KEY);
});
export default mapsRouter;
