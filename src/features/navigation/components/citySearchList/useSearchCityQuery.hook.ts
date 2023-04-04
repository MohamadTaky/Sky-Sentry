import { useQuery, QueryFunctionContext } from "react-query";
import axios from "axios";

export default function useSearchCityQuery(keyword: string) {
	return useQuery(["city", keyword], fetchLocation, {
		suspense: false,
		keepPreviousData: true,
		enabled: keyword.length > 2,
	});
}

async function fetchLocation({ queryKey }: QueryFunctionContext) {
	const params = new URLSearchParams({ name: queryKey[1] as string });
	const searchResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
	return await Promise.all(
		searchResponse.data?.results?.map(async (city: Record<string, any>) => {
			const cityInformation = await axios.get(`https://restcountries.com/v2/alpha/${city.country_code}`);
			return {
				...city,
				country: cityInformation.data.name,
				flag: cityInformation.data.flag,
			};
		})
	);
}
