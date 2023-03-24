import { Link, useSearchParams } from "react-router-dom";

export default function NavItem({ city }: { city: string }) {
	const [searchParams] = useSearchParams();
	const active = searchParams.get("city") === city;
	return (
		<Link to={`/?${new URLSearchParams({ city })}`} className="relative px-4 py-1 h-fit outline-none">
			<span
				className={`absolute z-50 -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-accent-3 transition-transform w-full ${
					active ? "scale-x-100" : "scale-x-0"
				}`}
			/>
			{city}
		</Link>
	);
}
