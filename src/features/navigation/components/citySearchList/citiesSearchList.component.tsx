import { CitySearchItem } from "../citySearchItem/citySearchItem.component";
import { useState } from "react";
import useSearchCityQuery from "./useSearchCityQuery.hook";
import { ICityProps } from "../../types";
import useSyncCitiesStorage from "./useSyncCititesStorage";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function CitiesSearchList() {
	const [searchInput, setSearchInput] = useState("");
	const { data, isLoading } = useSearchCityQuery(searchInput);
	useSyncCitiesStorage();

	return (
		<div className="relative w-1/3">
			<div className="absolute inset-y-0 pl-2 flex items-center text-light-gray">
				<MagnifyingGlass size="20" weight="bold" />
			</div>
			<input
				className="text-base w-full bg-transparent py-1 pl-8 outline-none focus:outline-none"
				value={searchInput}
				placeholder="Search for a city"
				onChange={event => setSearchInput(event.target.value)}
			/>
			{searchInput && (
				<ul className="absolute w-full  z-50 bg-black-2 custom-scroll text-black max-h-52 overflow-y-auto rounded-b-md">
					{!isLoading ? (
						data ? (
							data?.map((item: ICityProps) => (
								<CitySearchItem
									key={item.id}
									city={item.name}
									countryCode={item.country_code}
									resetInput={() => setSearchInput("")}
								/>
							))
						) : (
							<div className="p-2 text-center">List is empty</div>
						)
					) : (
						<div className="p-2 text-center">Loading</div>
					)}
				</ul>
			)}
		</div>
	);
}
