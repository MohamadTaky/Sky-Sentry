import fetch from "node-fetch";

export default async function handler(req, res) {
	const url = "http://ip-api.com/json/?fields=city,lat,lon,timezone";
	const response = await fetch(url);
	const data = await response.json();
	res.setHeader("Content-Type", "application/json");
	res.status(200).json(data);
}
