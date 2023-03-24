import axios, { AxiosResponse } from "axios";
import { QueryFunctionContext, useQuery } from "react-query";

export default function useCountryFlagQuery(countryCode: string) {
	return useQuery(["countryFlag", countryCode], fetchFlag, {
		select,
	});
}

function fetchFlag({ queryKey }: QueryFunctionContext) {
	return axios.get(`https://restcountries.com/v2/alpha/${queryKey[1]}`);
}

function select(data: AxiosResponse<any, any>) {
	return {
		flag: data.data.flags.png,
		countryName: data.data.name,
	};
}
