import { useEffect } from "react";
import { useAddCityStorage } from "libraries/zustand/store";
import { useLocation, useSearchParams } from "react-router-dom";
import { useActiveCityStorage } from "libraries/zustand/store";

export default function useSyncCitiesStorage() {
	const addCityStorage = useAddCityStorage();
	const activeCityStorage = useActiveCityStorage();

	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		const city = searchParams.get("city");
		if (city) addCityStorage(city);
	}, [location.search]);
	useEffect(() => {
		if (activeCityStorage) setSearchParams({ city: activeCityStorage });
	}, []);
}
