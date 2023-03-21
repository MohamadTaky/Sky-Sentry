import { useSearchParams } from "react-router-dom";
import { useQuery, QueryFunctionContext } from "react-query";
import axios, { AxiosResponse } from "axios";
import { IWeatherForecastItemProps, WeekDay, weatherCodes } from "../types";
import moment from "moment";

export default function useWeeklyForecast() {
	const [searchParams] = useSearchParams();
	return useQuery(
		["weeklyForecast", searchParams.get("city"), searchParams.get("lon"), searchParams.get("lat")],
		fetchWeatherForecast,
		{
			select,
			enabled: !!searchParams.get("city") === true,
		}
	);
}

async function fetchWeatherForecast({ queryKey }: QueryFunctionContext) {
	const [, , longitude, latitude] = queryKey;
	return axios.get(
		`https://api.open-meteo.com/v1/forecast?longitude=${longitude}&latitude=${latitude}&daily=weathercode,temperature_2m_max&timezone=auto`
	);
}

function select(data: AxiosResponse<any, any>) {
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
}
