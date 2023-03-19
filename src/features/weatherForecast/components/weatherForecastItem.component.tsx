import WeatherIcon from "./weatherIcon.component";
import { IWeatherForecastItemProps } from "../types";

export default function WeatherForecastItem({ day, date, temperature, type }: IWeatherForecastItemProps) {
	return (
		<li className="bg-dark-black w- border-x border-x-light-black text-white flex-1 p-2 flex flex-col items-center">
			<div className="text-xl font-bold">{day}</div>
			<div className="text-xl opacity-80 font-bold">{date}</div>
			<div className="text-sm my-auto w-1/2">
				<WeatherIcon type={type} />
			</div>
			<div className="text-sm">{temperature} °C</div>
		</li>
	);
}
