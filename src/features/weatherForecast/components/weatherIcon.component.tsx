import {
	Sun,
	Drop,
	CloudRain,
	Snowflake,
	CloudSnow,
	Cloud,
	CloudLightning,
	CloudFog,
} from "@phosphor-icons/react";

const size = 45;
const weatherIcons = {
	clear: <Sun size={size} weight="fill" className="text-orange-1" />,
	lightRain: <Drop size={size} weight="fill" className="text-[#0096FF]" />,
	rainy: (
		<div className="relative isolate">
			<CloudRain size={size} weight="fill" className="text-[#0096FF] absolute -z-10 top-2.5" />
			<Cloud size={size} weight="fill" className="relative left-0.5" />
		</div>
	),
	lightSnow: <Snowflake size={size} className="text-[#fffafa]" />,
	snowy: <CloudSnow size={size} weight="fill" className="text-[#fffafa]" />,
	partlyCloudy: (
		<div className="relative isolate">
			<Sun size="30" weight="fill" className="absolute -z-10 text-orange-1 " />
			<Cloud size={size} weight="fill" />
		</div>
	),
	cloudy: <Cloud size={size} weight="fill" />,
	foggy: <CloudFog size={size} weight="fill" className="text-white" />,
	thunderStorm: (
		<div className="relative isolate">
			<CloudLightning size={size} weight="fill" className="text-[#FDD023] absolute -z-10 top-2.5" />
			<Cloud size={size} weight="fill" className="relative left-0.5" />
		</div>
	),
};

export default function WeatherIcon({ type }: { type: string }) {
	return weatherIcons[type as keyof typeof weatherIcons];
}
