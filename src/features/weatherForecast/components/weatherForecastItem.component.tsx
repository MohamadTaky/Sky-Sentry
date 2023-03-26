import WeatherIcon from "./weatherIcon.component";
import { IWeatherForecastItemProps } from "../types";
import { Link, useSearchParams } from "react-router-dom";

export default function WeatherForecastItem({
	day,
	date,
	temperature,
	type,
	index,
}: IWeatherForecastItemProps) {
	const [searchParams] = useSearchParams();
	const path = `?${searchParams.get("city") ? `city=${searchParams.get("city")}&` : ""}day=${index}`;

	console.log(+(searchParams.get("day") ?? 0) === index);

	return (
		<li
			className={`${
				index === +(searchParams.get("day") ?? 0) ? "bg-black-1" : "bg-black-2"
			} border-x border-x-black-3  flex-1`}>
			<Link to={path} className="p-4 h-full flex flex-col items-center gap-2">
				<div className="text-xl font-bold">{day}</div>
				<div className="text-base opacity-80 font-bold">{date}</div>
				<div className="text-sm w-1/3 my-auto max-h-full">
					<WeatherIcon type={type} />
				</div>
				<div className="text-sm">{temperature} °C</div>
			</Link>
		</li>
	);
}
