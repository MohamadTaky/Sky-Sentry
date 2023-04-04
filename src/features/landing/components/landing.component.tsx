import { MagnifyingGlass, Clock, ThermometerSimple, Wind } from "@phosphor-icons/react";
import useWeatherForecastQuery from "features/weatherForecast/hooks/useWeatherForecastQuery.hook";
import clear from "/assets/clear.webp";
import partlyCloudy from "/assets/partly-cloudy.webp";
import cloudy from "/assets/cloudy.webp";
import foggy from "/assets/foggy.webp";
import lightRain from "/assets/light-rain.webp";
import rainy from "/assets/rainy.webp";
import lightSnow from "/assets/snowy.webp";
import snowy from "/assets/snowy.webp";
import thunderStorm from "/assets/stormy.webp";
import SearchParamLink from "components/searchParamLink";
import { format } from "date-fns";

export default function Landing() {
	const { data } = useWeatherForecastQuery();
	console.log(data?.currentWeather.type);

	return (
		<main
			className="h-screen relative flex flex-col bg-cover bg-top z-0"
			style={{
				backgroundImage: `url(${images[data?.currentWeather.type ?? "clear"]})`,
			}}>
			<div className="absolute inset-0 bg-black-3 opacity-25 -z-10" />
			<SearchParamLink param="searching=true" className="ml-auto">
				<MagnifyingGlass className="m-2" size="30" weight="bold" />
			</SearchParamLink>
			<div className="px-4 flex flex-col gap-4">
				<h1 className="text-4xl md:text-6xl font-bold text-accent-3">{data?.city}</h1>
				<time className="text-2xl md:text-3xl">{format(Date.now(), "EEE, MMM dd")}</time>
				<div className="flex items-center gap-2">
					<Clock size="30" />
					<time className="text-xl">
						{format(Date.now(), "h:mm")}{" "}
						<span className="text-base text-white-3">{format(Date.now(), "aaa")}</span>
					</time>
				</div>
				<div className="flex items-center gap-2">
					<ThermometerSimple size="30" />
					<span className="text-xl">
						{data?.currentWeather.temperature}
						<span className="text-base text-white-3"> °C</span>
					</span>
				</div>
				<div className="flex items-center gap-2">
					<Wind size="30" />
					<span className="text-xl">
						{data?.currentWeather.windspeed}
						<span className="text-base text-white-3"> Km/h</span>
					</span>
				</div>
			</div>
			<p className="relative md:text-lg text-center mx-auto w-11/12 mt-auto p-3 bg-black-2 rounded-t-2xl">
				{advices[data?.currentWeather.type ?? "clear"][Math.floor(Math.random() * 3)]}
			</p>
		</main>
	);
}

const images = {
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

const advices = {
	clear: [
		"Protect your skin from the sun's harmful rays",
		"Stay hydrated, even if it doesn't feel too hot outside.",
		"Seek shade and avoid extended exposure to the sun during peak hours",
	],
	partlyCloudy: [
		"Be prepared for sudden changes in weather",
		"Enjoy the pleasant weather by taking a walk or engaging in outdoor activities.",
		"Be aware that the sun's rays can still be harmful",
	],
	foggy: [
		"Be cautious when driving in foggy conditions and use low-beam headlights.",
		"Slow down and stay aware of your surroundings to avoid accidents.",
		"Wear reflective clothing or accessories to increase visibility in low-light conditions.",
	],
	cloudy: [
		"Dress in layers to stay comfortable in changing temperatures.",
		"Be aware that the temperature may be cooler than expected and bring a jacket or sweater.",
		"Check the weather forecast for potential changes in weather throughout the day.",
	],
	lightRain: [
		"Stay dry by bringing a light jacket with you.",
		"Use an umbrella or find shelter if the rain becomes too heavy.",
		"Be cautious when driving on wet roads and avoid sudden stops or turns.",
	],
	rainy: [
		"Stay dry by bringing an umbrella or wearing a waterproof raincoat.",
		"Be cautious when driving on wet roads and avoid sudden stops or turns.",
		"Slow down and take smaller steps when walking on wet surfaces to avoid slipping.",
	],
	lightSnow: [
		"Stay warm by dressing in layers and wearing waterproof boots and gloves.",
		"Be cautious when walking on slippery surfaces and wear shoes with good traction.",
		"Drive carefully on snowy or icy roads to avoid accidents.",
	],
	snowy: [
		"Stay warm by dressing in layers and wearing waterproof boots and gloves.",
		"Be cautious when walking or driving on snow and ice and avoid sudden movements.",
		"Use a shovel or snow blower to clear your driveway and sidewalks to avoid slips and falls.",
	],
	thunderStorm: [
		"Stay indoors and avoid using electronic devices or appliances during the storm.",
		"Be aware of lightning strikes and avoid contact with metal objects and water sources.",
		"Stay prepared for power outages and have a backup plan in case of emergencies.",
	],
};
