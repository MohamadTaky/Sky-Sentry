import WeatherIcon from "./weatherIcon.component";
import { IWeatherForecastItemProps } from "../types";

export default function WeatherForecastItem({ day, date, temperature, type }: IWeatherForecastItemProps) {
	return (
		<li className="bg-black-2 border-x border-x-black-3 p-4 flex-1 flex flex-col items-center gap-2">
			<div className="text-xl font-bold">{day}</div>
			<div className="text-base opacity-80 font-bold">{date}</div>
			<div className="text-sm w-1/3 my-auto max-h-full">
				<WeatherIcon type={type} />
			</div>
			<div className="text-sm">{temperature} °C</div>
		</li>
	);
}
