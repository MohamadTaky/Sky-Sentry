import WeatherForecastItem from "./weatherForecastItem.component";
import useWeatherForecastQuery from "../hooks/useWeatherForecastQuery.hook";

export default function WeatherForecastList() {
	const { data } = useWeatherForecastQuery();
	return (
		<section className="h-screen w-11/12 mx-auto">
			{data?.daily.slice(1).map(el => (
				<WeatherForecastItem key={el.time} {...el} />
			))}
		</section>
	);
}
