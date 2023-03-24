import CitiesSearchList from "../citySearchList/citiesSearchList.component";
import { useCitiesStorage } from "libraries/zustand/store";
import NavItem from "../navItem/navItem.componenet";

export default function Navbar() {
	const cities = useCitiesStorage();
	return (
		<nav className="h-8 inset-y-0 flex items-center bg-black-2 gap-4 px-4">
			<CitiesSearchList />
			{cities.map(city => (
				<NavItem key={city} city={city} />
			))}
		</nav>
	);
}
