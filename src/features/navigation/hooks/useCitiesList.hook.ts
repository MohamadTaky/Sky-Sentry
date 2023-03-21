import { useQuery, QueryFunctionContext } from "react-query";
import axios, { AxiosResponse } from "axios";

export default function useCitiesList(locationName: string) {
	return useQuery(["manualCity", locationName], fetchLocation, { select });
}

async function fetchLocation({ queryKey }: QueryFunctionContext) {
	return axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${queryKey[1]}`);
}

function select(data: AxiosResponse<any, any>) {
	return data.data.results;
}
