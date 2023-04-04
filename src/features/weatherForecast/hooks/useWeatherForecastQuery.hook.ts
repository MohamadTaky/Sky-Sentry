import { QueryFunctionContext, useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "react-router-dom";
import { useActiveCityStorage } from "libraries/zustand/store";

export default function useWeatherForecastQuery() {
	const [searchParams] = useSearchParams();
	const activeCity = useActiveCityStorage();
	const key = searchParams.get("city") ?? activeCity ?? "";

	return useQuery(["weeklyForecast", key], fetchWeatherForecast, {
		select,
		keepPreviousData: true,
		staleTime: 1000 * 60 * 30,
		suspense: true,
	});
}

function select(data: AxiosResponse) {
	const dailyData = data.data.daily;
	const dailyArr = Array(7)
		.fill({})
		.map((_el, i) => ({
			time: dailyData.time[i],
			maxTemperature: Math.round(dailyData.temperature_2m_max[i]),
			minTemperature: Math.round(dailyData.temperature_2m_min[i]),
			type: weatherCodes[dailyData.weathercode[i]],
			sunrise: dailyData.sunrise[i],
			sunset: dailyData.sunset[i],
			windSpeed: dailyData.windspeed_10m_max[i],
			precipitationProbability: dailyData.precipitation_probability_max[i],
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
					cloudCover: hourlyData.cloudcover[i * 24 + j],
					windSpeed: hourlyData.windspeed_10m[i * 24 + j],
					humidity: hourlyData.relativehumidity_2m[i * 24 + j],
				}))
		);

	return {
		daily: dailyArr,
		hourly: hourlyArr,
		currentWeather: {
			time: data.data.current_weather.time,
			winddirection: data.data.current_weather.winddirection,
			windspeed: data.data.current_weather.windspeed,
			temperature: data.data.current_weather.temperature,
			type: weatherCodes[data.data.current_weather.weathercode],
		},
		city: data.data.city,
		timezone: data.data.timezone,
	};
}

function fetchLocation(city: string | undefined) {
	const request = city
		? `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
		: "http://ip-api.com/json/?fields=city,lat,lon,timezone";
	return axios.get(request, {
		transformResponse: response => {
			const jsonResponse = JSON.parse(response);
			if (jsonResponse.results)
				return {
					city: jsonResponse.results[0].name,
					lon: jsonResponse.results[0].longitude,
					lat: jsonResponse.results[0].latitude,
					timezone: jsonResponse.results[0].timezone ?? "auto",
				};
			return jsonResponse;
		},
	});
}

function fetchWeatherForecast({ queryKey }: QueryFunctionContext) {
	const city = queryKey[1] as string;
	return fetchLocation(city).then(locationResponse => {
		return axios.get(
			`https://api.open-meteo.com/v1/forecast?longitude=${locationResponse.data.lon}
			&latitude=${locationResponse.data.lat}
			&current_weather=true
			&daily=sunrise,sunset,weathercode,temperature_2m_max,temperature_2m_min,winddirection_10m_dominant,windspeed_10m_max,precipitation_probability_max
			&hourly=apparent_temperature,cloudcover,windspeed_10m,relativehumidity_2m&timezone=${locationResponse.data.timezone}`,
			{
				transformResponse: forecastResponse => ({
					...JSON.parse(forecastResponse),
					city: locationResponse.data.city,
					timezone: locationResponse.data.timezone,
				}),
			}
		);
	});
}

const weatherCodes: Record<
	number,
	| "clear"
	| "partlyCloudy"
	| "cloudy"
	| "foggy"
	| "lightRain"
	| "rainy"
	| "lightSnow"
	| "snowy"
	| "thunderStorm"
> = {
	0: "clear",
	1: "clear",
	2: "partlyCloudy",
	3: "cloudy",
	45: "foggy",
	48: "foggy",
	51: "lightRain",
	53: "lightRain",
	55: "lightRain",
	56: "lightSnow",
	57: "lightSnow",
	61: "rainy",
	63: "rainy",
	65: "rainy",
	66: "rainy",
	67: "rainy",
	71: "snowy",
	73: "snowy",
	75: "snowy",
	77: "snowy",
	80: "rainy",
	81: "rainy",
	82: "rainy",
	85: "lightSnow",
	86: "lightSnow",
	95: "thunderStorm",
	96: "thunderStorm",
	99: "thunderStorm",
};
