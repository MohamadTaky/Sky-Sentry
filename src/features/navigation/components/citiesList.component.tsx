import { CityListItem } from "./cityItem.component";
import { useState } from "react";
import useAutoCityDetection from "../hooks/useAutoCityDetection.hook";
import useCitiesList from "../hooks/useCitiesList.hook";
import { ICityProps } from "../types";

export default function CitiesList() {
	const [locationName, setLocationName] = useState("");
	const { data, isLoading } = useCitiesList(locationName);
	useAutoCityDetection();
	return (
		<div className="relative">
			<input
				className="text-black h-full focus:outline-none px-2 w-96 rounded-t-md"
				value={locationName}
				placeholder="Search for a city"
				onChange={event => setLocationName(event.target.value)}
			/>
			{locationName && (
				<ul className="absolute w-full z-50 bg-white custom-scroll text-black max-h-52 overflow-y-auto rounded-b-md">
					{!isLoading ? (
						data ? (
							data?.map((item: ICityProps) => (
								<CityListItem
									key={item.id}
									name={item.name}
									countryCode={item.country_code}
									latitude={item.latitude}
									longitude={item.longitude}
									resetInput={() => setLocationName("")}
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
