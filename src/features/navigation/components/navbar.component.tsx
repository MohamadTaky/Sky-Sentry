import { useSearchParams } from "react-router-dom";
import CitiesList from "./citiesList.component";

export default function Navbar() {
	const [searchParams] = useSearchParams();
	return (
		<nav className="text-white flex gap-4">
			<div className="bg-light-black px-2 py-1 rounded">{searchParams.get("city")}</div>
			<CitiesList />
		</nav>
	);
}
