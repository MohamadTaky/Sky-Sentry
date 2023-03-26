import { QueryFunctionContext, useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { WeekDay, weatherCodes } from "../types";
import moment from "moment";
import { useSearchParams } from "react-router-dom";

export default function useWeatherForecastQuery() {
	const [searchParams] = useSearchParams();
	return useQuery(["weeklyForecast", searchParams.get("city")], fetchWeatherForecast, {
		select,
		keepPreviousData: true,
	});
}

function select(data: AxiosResponse<any, any>) {
	const dailyData = data.data.daily;
	const dailyArr = Array(7)
		.fill({})
		.map((_el, i) => ({
			day: moment(dailyData.time[i]).format("ddd") as WeekDay,
			date: parseInt(moment(dailyData.time[i]).format("DD")),
			temperature: Math.round(dailyData.temperature_2m_max[i]),
			type: weatherCodes[dailyData.weathercode[i]],
			sunrise: dailyData.sunrise[i],
			sunset: dailyData.sunset[i],
			windSpeed: dailyData.windspeed_10m_max[i],
			currentWeather: data.data.current_weather,
		}));

	const hourlyData = data.data.hourly;
	const hourlyArr = Array(7)
		.fill([])
		.map((_day, i) =>
			Array(24)
				.fill({})
				.map((_hour, j) => ({
					time: hourlyData.time[i * 24 + j],
					temperature: hourlyData.apparent_temperature[i * 24 + j],
				}))
		);

	return {
		daily: dailyArr,
		hourly: hourlyArr,
		currentWeather: data.data.current_weather,
		city: data.data.city,
	};
}

function fetchLocation(city: string | undefined) {
	const request = city
		? `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
		: "http://ip-api.com/json/?fields=city,lat,lon";
	return axios.get(request, {
		transformResponse: response => {
			const jsonResponse = JSON.parse(response);
			if (jsonResponse.results)
				return {
					city: jsonResponse.results[0].name,
					lon: jsonResponse.results[0].longitude,
					lat: jsonResponse.results[0].latitude,
				};
			return jsonResponse;
		},
	});
}

function fetchWeatherForecast({ queryKey }: QueryFunctionContext) {
	const city = queryKey[1] as string;
	return fetchLocation(city).then(response =>
		axios.get(
			`https://api.open-meteo.com/v1/forecast?longitude=${response.data.lon}
		&latitude=${response.data.lat}
		&current_weather=true
		&daily=sunrise,sunset,weathercode,temperature_2m_max,winddirection_10m_dominant,windspeed_10m_max
		&hourly=apparent_temperature
		&timezone=auto`,
			{ transformResponse: response => ({ ...JSON.parse(response), city }) }
		)
	);
}
