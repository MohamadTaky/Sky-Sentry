import useWeatherForecastQuery from "features/weatherForecast/hooks/useWeatherForecastQuery.hook";

export default function WeatherForecastDetails() {
	const { data } = useWeatherForecastQuery();
	return <div className="h-full">Details</div>;
}
