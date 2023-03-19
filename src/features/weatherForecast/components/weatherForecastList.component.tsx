import WeatherForecastItem from "./weatherForecastItem.component";
import moment from "moment";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { IWeatherForecastItemProps, weatherCodes, WeekDay } from "../types";

function fetchWeatherForecast() {
	return axios.get(
		"https://api.open-meteo.com/v1/forecast?latitude=35.13&longitude=36.76&daily=weathercode,temperature_2m_max&timezone=auto"
	);
}

export default function WeatherForecastList() {
	const select = (data: AxiosResponse<any, any>) => {
		const weekData = data.data.daily;
		const arr: IWeatherForecastItemProps[] = Array(7)
			.fill({})
			.map((_el, i) => ({
				day: moment(weekData.time[i]).format("ddd") as WeekDay,
				date: parseInt(moment(weekData.time[i]).format("DD")),
				temperature: weekData.temperature_2m_max[i],
				type: weatherCodes[weekData.weathercode[i]],
			}));
		return arr;
	};
	const { data, isLoading } = useQuery(["weeklyForecast"], fetchWeatherForecast, { select });
	if (isLoading) return <p>Loading</p>;
	return (
		<ul className="mt-auto h-60 max-w-full flex justify-center">
			{data?.map((el: IWeatherForecastItemProps, i) => (
				<WeatherForecastItem key={i} {...el} />
			))}
		</ul>
	);
}
