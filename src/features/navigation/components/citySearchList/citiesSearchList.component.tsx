import { useState } from "react";
import useSearchCityQuery from "./useSearchCityQuery.hook";
import { X } from "@phosphor-icons/react";
import CitySearchItem, { DeletableCitySearchItem } from "../citySearchItem/citySearchItem.component";
import { AnimatePresence, motion } from "framer-motion";
import { useCitiesStorage } from "libraries/zustand/store";
import SearchParamLink from "components/searchParamLink";

export default function CitiesSearchList() {
	const [searchInput, setSearchInput] = useState("");
	const { data, isPreviousData, isFetching } = useSearchCityQuery(searchInput);
	const citiesStorage = useCitiesStorage();

	return (
		<motion.div
			initial={{ translateY: "-100%" }}
			animate={{ translateY: 0 }}
			exit={{ translateY: "-100%" }}
			transition={{ duration: 0.16, type: "tween", ease: "easeOut" }}
			className="fixed z-50 inset-0 w-screen h-screen overflow-y-auto origin-top-right bg-black-2">
			<div className="bg-black-2 sticky top-0 z-10 flex items-center border-b-2 border-black-1 p-2">
				<input
					className="w-full bg-transparent outline-none focus:outline-none"
					value={searchInput}
					placeholder="Search for a city"
					onChange={event => setSearchInput(event.target.value)}
				/>
				<SearchParamLink param="searching" onClick={() => setSearchInput("")}>
					<X size="30" weight="bold" />
				</SearchParamLink>
			</div>

			<motion.ul className="relative w-11/12 h-fit mx-auto" animate={{ opacity: isPreviousData ? 0.5 : 1 }}>
				<AnimatePresence>
					{searchInput.length > 2 ? (
						data?.length ? (
							data.map(item => (
								<CitySearchItem key={item.id} city={item.name} flag={item.flag} country={item.country} />
							))
						) : isFetching ? (
							<li className="p-4 text-center">Loading</li>
						) : (
							<li className="p-4 text-center">No results found</li>
						)
					) : (
						citiesStorage.map(city => <DeletableCitySearchItem key={city} city={city} />)
					)}
				</AnimatePresence>
			</motion.ul>
		</motion.div>
	);
}
