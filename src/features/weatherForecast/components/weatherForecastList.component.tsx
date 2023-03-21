import WeatherForecastItem from "./weatherForecastItem.component";
import { CircleNotch } from "@phosphor-icons/react";
import useWeeklyForecast from "../hooks/useWeeklyForecast.hook";

export default function WeatherForecastList() {
	const { data, isLoading } = useWeeklyForecast();
	return (
		<ul className="h-60 max-w-full flex p-4 gap-4 justify-center items-center">
			{isLoading ? (
				<CircleNotch weight="bold" size={70} className="text-light-black animate-spin" />
			) : (
				data?.map((el, i) => <WeatherForecastItem key={i} {...el} />)
			)}
		</ul>
	);
}
