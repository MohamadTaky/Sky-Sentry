import { WeatherType, weatherCodes } from "features/weatherForecast/types";
import { ThermometerSimple, Wind, Clock } from "@phosphor-icons/react";
import useWeatherForecastQuery from "features/weatherForecast/hooks/useWeatherForecastQuery.hook";

import clear from "../assets/clear.jpg";
import partlyCloudy from "../assets/partly-cloudy.jpg";
import cloudy from "../assets/cloudy.jpg";
import foggy from "../assets/foggy.jpg";
import lightRain from "../assets/light-rain.jpg";
import rainy from "../assets/rain.jpg";
import lightSnow from "../assets/light-snow.jpg";
import snowy from "../assets/snow.jpg";
import thunderStorm from "../assets/thunder-storm.jpg";
import moment from "moment";

export default function Landing() {
	const { isLoading, isPreviousData, data } = useWeatherForecastQuery();

	return (
		<div className="h-2/3 overflow-hidden relative z-10">
			<img
				className={`absolute -inset-y-1 w-[110%] h-[110%] -z-20 object-cover transition-all duration-700 ${
					isPreviousData ? "blur" : "blur-0"
				}`}
				src={images[weatherCodes[data?.currentWeather.weathercode] ?? "clear"]}
				alt=""
			/>
			<div className="absolute w-full h-full inset-y-0 bg-black-3 -z-10 opacity-50" />
			{!isLoading ? (
				<div className="p-4 text-xl">
					<h1 className="text-6xl font-bold mb-6 text-accent-3">{data?.city}</h1>
					<div className="flex items-end mb-4">
						<Clock size="40" />
						<p className="ml-2 mr-1">{moment().format("h:mm")}</p>
						<span className="text-sm text-white-2">{moment().format("A")}</span>
					</div>
					<div className="flex items-end mb-4">
						<ThermometerSimple size="40" />
						<p className="ml-2 mr-1">{data?.currentWeather.temperature}</p>
						<span className="text-sm text-white-2">°C</span>
					</div>
					<div className="flex items-end mb-4">
						<Wind size="40" />
						<p className="ml-2 mr-1">{data?.currentWeather.windspeed}</p>
						<span className="text-sm text-white-2">Km/h</span>
					</div>
				</div>
			) : (
				<></>
			)}
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
