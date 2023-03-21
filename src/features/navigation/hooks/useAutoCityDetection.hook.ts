import axios from "axios";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

export default function useAutoCityDetection() {
	const [searchParams, setSearchParams] = useSearchParams();
	useQuery(["autoCity"], fetchLocation, {
		enabled: !!searchParams.get("city") === false,
		onSuccess: data => setSearchParams({ ...data.data }),
	});
}

function fetchLocation() {
	return axios.get(`http://ip-api.com/json/?fields=city,lat,lon`);
}
