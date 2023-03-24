import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ICity {
	name: string;
	lon: number;
	lat: number;
}

export interface IStore {
	cities: string[];
	activeCity: string;
	addCity: (city: string) => void;
	deleteCity: (city: string) => void;
}

const usePersistedStore = create<IStore>()(
	persist(
		(set, get) => {
			const obj: IStore = {
				cities: [],
				activeCity: "",
				addCity: city =>
					set({
						cities: get().cities.find(element => element === city) ? get().cities : [...get().cities, city],
						activeCity: city,
					}),
				deleteCity: city => set({ cities: get().cities.filter(element => element !== city) }),
			};
			return obj;
		},
		{ name: "cities-storage" }
	)
);

export function useCitiesStorage() {
	return usePersistedStore(state => state.cities);
}

export function useActiveCityStorage() {
	return usePersistedStore(state => state.activeCity);
}

export function useAddCityStorage() {
	return usePersistedStore(state => state.addCity);
}

export function useDeleteCityStorage() {
	return usePersistedStore(state => state.deleteCity);
}

export default usePersistedStore;
