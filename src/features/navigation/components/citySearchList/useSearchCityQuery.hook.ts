import { useQuery, QueryFunctionContext } from "react-query";
import axios, { AxiosResponse } from "axios";

export default function useSearchCityQuery(keyword: string) {
	return useQuery(["city", keyword], fetchLocation, { select, enabled: !!keyword });
}

async function fetchLocation({ queryKey }: QueryFunctionContext) {
	return axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${queryKey[1]}`);
}

function select(data: AxiosResponse<any, any>) {
	return data.data.results;
}
