import { WeatherType } from "features/weatherForecast/types";
import useWeeklyForecast from "features/weatherForecast/hooks/useWeeklyForecast.hook";

import clear from "../assets/clear.jpg";
import partlyCloudy from "../assets/partly-cloudy.jpg";
import cloudy from "../assets/cloudy.jpg";
import foggy from "../assets/foggy.jpg";
import lightRain from "../assets/light-rain.jpg";
import rainy from "../assets/rain.jpg";
import lightSnow from "../assets/light-snow.jpg";
import snowy from "../assets/snow.jpg";
import thunderStorm from "../assets/snow.jpg";

export default function Overlay() {
	const { data } = useWeeklyForecast();
	return (
		<div
			className="fixed top-0 left-0 w-full h-full -z-10"
			style={{ backgroundImage: `url('${images[data?.[0].type || "clear"]}')` }}>
			<div className="absolute left-0 top-0 w-full h-full opacity-60 bg-black"></div>
		</div>
	);
}

const images: Record<WeatherType, string> = {
	clear,
	partlyCloudy,
	cloudy,
	foggy,
	lightRain,
	rainy,
	lightSnow,
	snowy,
	thunderStorm,
};
