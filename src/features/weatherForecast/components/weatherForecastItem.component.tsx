import WeatherIcon from "./weatherIcon.component";
import { Drop, Wind } from "@phosphor-icons/react";
import { format, parseISO } from "date-fns";

export default function WeatherForecastItem({
	time,
	maxTemperature,
	minTemperature,
	windSpeed,
	precipitationProbability,
	type,
}: IProps) {
	const date = parseISO(time);
	return (
		<article className="h-1/6 bg-black-2 border-b-2 border-y-black-1 last:border-none flex gap-4 px-4 items-center justify-between">
			<div className="w-40">
				<time className="text-lg md:text-xl mb-2">{format(date, "eeee d")}</time>
				<div className="flex gap-2 items-center">
					<Drop size="25" weight="fill" className="text-blue-1 inline-block" />
					{precipitationProbability}%
					<Wind size="25" weight="fill" className="text-white-3 inline-block" />
					{windSpeed}Km/h
				</div>
			</div>
			<WeatherIcon type={type} />
			<div className="text-center">
				<div>{maxTemperature}°</div>
				<div className="text-white-3">{minTemperature}°</div>
			</div>
		</article>
	);
}

export interface IProps {
	time: string;
	maxTemperature: number;
	minTemperature: number;
	windSpeed: number;
	precipitationProbability: number;
	type: string;
}
