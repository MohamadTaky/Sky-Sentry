import { useDeleteCityStorage } from "libraries/zustand/store";
import SearchParamLink from "components/searchParamLink";
import { useAddCityStorage } from "libraries/zustand/store";
import { X } from "@phosphor-icons/react";

interface IProps {
	city: string;
	flag: string;
	country: string;
}

export default function CitySearchItem({ city, flag, country }: IProps) {
	const addCityStorage = useAddCityStorage();
	return (
		<li>
			<SearchParamLink
				onClick={() => addCityStorage(city)}
				param={[`city=${city}`, "searching"]}
				className="cursor-pointer transition-colors hover:bg-black-1 p-2 flex items-center gap-2 w-full h-16">
				<div className="text-sm w-[15ch]">{city}</div>
				<div className="text-xs max-w-[35ch] text-white-3 flex-1">{country}</div>
				<img className="object-cover w-6 h-6 rounded ml-auto" src={flag} alt="" />
				{}
			</SearchParamLink>
		</li>
	);
}

export function DeletableCitySearchItem({ city }: { city: string }) {
	const deleteCityStorage = useDeleteCityStorage();
	return (
		<li className="group hover:bg-black-1 flex items-center justify-between gap-2">
			<SearchParamLink
				param={[`city=${city}`, "searching"]}
				className="flex items-center cursor-pointer transition-colors p-2 w-full h-16">
				<div className="text-sm w-[15ch]">{city}</div>
			</SearchParamLink>
			<button className="p-2" onClick={() => deleteCityStorage(city)}>
				<X size="25" />
			</button>
		</li>
	);
}
