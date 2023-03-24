import WeatherForecastItem from "./weatherForecastItem.component";
import { CircleNotch } from "@phosphor-icons/react";
import useWeatherForecastQuery from "../hooks/useWeatherForecastQuery.hook";

export default function WeatherForecastList() {
	const { data, isLoading } = useWeatherForecastQuery();

	return (
		<ul className="max-w-full h-1/3 flex bg-dark-black sticky">
			{isLoading ? (
				<CircleNotch weight="bold" size={70} className="text-light-black animate-spin" />
			) : (
				data?.daily.map((el, i) => <WeatherForecastItem key={i} {...el} />)
			)}
		</ul>
	);
}
