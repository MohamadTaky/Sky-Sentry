import fetch from "node-fetch";

export default async function handler(req, res) {
	const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
	const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.LOCATION_KEY}&ip=${userIp}`;
	const response = await fetch(url);
	const data = await response.json();
	res.setHeader("Content-Type", "application/json");
	res.status(200).json(data);
}
